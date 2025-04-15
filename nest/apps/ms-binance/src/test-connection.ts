// test-binance-ws.ts
import { io } from 'socket.io-client';

// Connect to your NestJS WebSocket server
const socket = io('http://localhost:3000/market', {
  transports: ['websocket'],
});

// Symbol to subscribe to
const symbol = 'btcusdt';

// Event handlers
socket.on('connect', () => {
  console.log('Connected to server');

  // Subscribe to market data
  socket.emit('subscribe', { symbol });
  console.log(`Subscribed to ${symbol}`);
});

socket.on('connection', (data) => {
  console.log('Server message:', data);
});

socket.on('marketData', (data) => {
  console.log(`${new Date().toISOString()} - Received market data:`, data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Cleanup on exit
process.on('SIGINT', () => {
  console.log('Unsubscribing and disconnecting...');
  socket.emit('unsubscribe', { symbol });
  socket.disconnect();
  process.exit();
});
