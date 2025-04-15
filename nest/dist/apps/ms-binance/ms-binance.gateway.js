"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MsBinanceGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsBinanceGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const ms_binance_service_1 = require("./ms-binance.service");
const create_subscription_dto_1 = require("./dto/create-subscription.dto");
let MsBinanceGateway = MsBinanceGateway_1 = class MsBinanceGateway {
    marketService;
    server;
    logger = new common_1.Logger(MsBinanceGateway_1.name);
    constructor(marketService) {
        this.marketService = marketService;
    }
    afterInit() {
        this.logger.log('WebSocket Gateway Initialized');
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
        client.emit('connection', { message: 'Welcome to Market Data WebSocket' });
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleSubscribe(client, payload) {
        const { symbol } = payload;
        this.logger.log(`Client ${client.id} subscribed to ${symbol} updates`);
        this.marketService.subscribeToMarketData(symbol, (data) => {
            client.emit('marketData', { symbol, data });
        });
    }
    handleSubscribeOnce(client, payload) {
        const { symbol } = payload;
        this.logger.log(`Client ${client.id} requested one-time data for ${symbol}`);
        this.marketService.subscribeToMarketDataOnce(symbol, (data) => {
            client.emit('marketDataOnce', { symbol, data });
        });
    }
    handleUnsubscribe(client, payload) {
        const { symbol } = payload;
        this.logger.log(`Client ${client.id} unsubscribed from ${symbol} updates`);
        this.marketService.unsubscribeFromMarketData(symbol);
    }
    handlePing(client) {
        client.emit('pong');
    }
};
exports.MsBinanceGateway = MsBinanceGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MsBinanceGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_subscription_dto_1.SubscriptionRequestDto]),
    __metadata("design:returntype", void 0)
], MsBinanceGateway.prototype, "handleSubscribe", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribeOnce'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_subscription_dto_1.SubscriptionRequestDto]),
    __metadata("design:returntype", void 0)
], MsBinanceGateway.prototype, "handleSubscribeOnce", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_subscription_dto_1.SubscriptionRequestDto]),
    __metadata("design:returntype", void 0)
], MsBinanceGateway.prototype, "handleUnsubscribe", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MsBinanceGateway.prototype, "handlePing", null);
exports.MsBinanceGateway = MsBinanceGateway = MsBinanceGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/market', cors: { origin: '*' } }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ms_binance_service_1.MsBinanceService])
], MsBinanceGateway);
//# sourceMappingURL=ms-binance.gateway.js.map