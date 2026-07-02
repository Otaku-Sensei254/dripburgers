export type CartLine = {
  menuItemId: string;
  name: string;
  price: number;
  qty: number;
};

export type KitchenOrder = {
  id: string;
  tableId: string;
  items: CartLine[];
  note: string;
  status: 'pending' | 'ready';
  createdAt: number;
};
