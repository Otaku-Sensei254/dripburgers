/**
 * Demo real-time ordering hub. Run: npm run server (or npm run dev)
 * Kitchen password: dripkitchen (override with env KITCHEN_PASSWORD)
 */
const http = require('http');
const { randomUUID } = require('crypto');
const { Server } = require('socket.io');




const PORT = Number(process.env.PORT || 4000);
const KITCHEN_PASSWORD = process.env.KITCHEN_PASSWORD || 'dripkitchen';

/** @type {Map<string, any>} */
const orders = new Map();




const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

function broadcastOrders() {
  const list = Array.from(orders.values()).sort((a, b) => a.createdAt - b.createdAt);
  io.to('kitchen').emit('orders:sync', list);
  io.to('counter').emit('counter:sync', list);
}

io.on('connection', (socket) => {
  socket.data.isKitchen = false;

  socket.on('kitchen:auth', ({ password }) => {
    if (password === KITCHEN_PASSWORD) {
      socket.data.isKitchen = true;
      socket.join('kitchen');
      socket.emit('kitchen:authenticated');
      broadcastOrders();
      return;
    }
    socket.emit('kitchen:auth:error', 'Invalid password');
  });

  socket.on('counter:auth', ({ password }) => {
    if (password === KITCHEN_PASSWORD) {
      socket.data.isCounter = true;
      socket.join('counter');
      socket.emit('counter:authenticated');
      broadcastOrders();
      return;
    }
    socket.emit('counter:auth:error', 'Invalid password');
  });

  socket.on('order:submit', ({ tableId, items, note }) => {
    if (!tableId || !Array.isArray(items) || items.length === 0) {
      socket.emit('order:error', 'Invalid order');
      return;
    }
    const id = randomUUID();
    const order = {
      id,
      tableId: String(tableId),
      items: items.map((i) => ({
        menuItemId: String(i.menuItemId),
        name: String(i.name),
        price: Number(i.price),
        qty: Math.max(1, Number(i.qty) || 1),
      })),
      note: typeof note === 'string' ? note.slice(0, 500) : '',
      status: 'pending',
      createdAt: Date.now(),
    };
    orders.set(id, order);
    broadcastOrders();
    socket.emit('order:submitted', { id });
  });

  socket.on('order:complete', ({ orderId }) => {
    if (!socket.data.isKitchen || !socket.rooms.has('kitchen')) {
      socket.emit('order:error', 'Not authorized');
      return;
    }
    if (!orderId || !orders.has(orderId)) {
      socket.emit('order:error', 'Order not found');
      return;
    }
    const order = orders.get(orderId);
    order.status = 'ready';
    broadcastOrders();
    socket.emit('order:completed:ack', { orderId });
  });

  socket.on('order:pay', ({ orderId, phone }) => {
    if (!socket.data.isCounter || !socket.rooms.has('counter')) {
      socket.emit('order:error', 'Not authorized');
      return;
    }
    if (!orderId || !orders.has(orderId)) {
      socket.emit('order:error', 'Order not found');
      return;
    }
    const order = orders.get(orderId);
    if (!phone || typeof phone !== 'string' || phone.trim().length < 10) {
      socket.emit('order:error', 'Valid phone number required');
      return;
    }
    const stkId = randomUUID();
    const receipt = {
      receiptId: randomUUID(),
      orderId: order.id,
      tableId: order.tableId,
      items: order.items,
      note: order.note,
      phone: phone.trim(),
      total: order.items.reduce((s, i) => s + i.price * i.qty, 0),
      stkId,
      paidAt: Date.now(),
    };
    orders.delete(orderId);
    broadcastOrders();
    socket.emit('order:paid', receipt);
  });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Drip orders server on port ${PORT} (kitchen pwd: "${KITCHEN_PASSWORD}")`);
});
