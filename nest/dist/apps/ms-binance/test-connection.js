"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)('http://localhost:3000/market', {
    transports: ['websocket'],
});
const symbol = 'btcusdt';
socket.on('connect', () => {
    console.log('Connected to server');
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
process.on('SIGINT', () => {
    console.log('Unsubscribing and disconnecting...');
    socket.emit('unsubscribe', { symbol });
    socket.disconnect();
    process.exit();
});
//# sourceMappingURL=test-connection.js.map