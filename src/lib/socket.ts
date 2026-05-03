import { io, Socket } from 'socket.io-client';

function socketUrl(): string {
  if (process.env.REACT_APP_SOCKET_URL) {
    return process.env.REACT_APP_SOCKET_URL;
  }
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:4000`;
  }
  return 'http://localhost:4000';
}

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(socketUrl(), {
      autoConnect: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket.removeAllListeners();
    socket = null;
  }
}
