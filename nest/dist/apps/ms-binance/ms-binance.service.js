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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MsBinanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsBinanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const currency_stream_schema_1 = require("./schemas/currency-stream.schema");
const WebSocket = require("ws");
let MsBinanceService = MsBinanceService_1 = class MsBinanceService {
    currencyStreamModel;
    logger = new common_1.Logger(MsBinanceService_1.name);
    websockets = new Map();
    subscriptionCallbacks = new Map();
    baseUrl = 'wss://stream.binance.com:9443/ws/';
    constructor(currencyStreamModel) {
        this.currencyStreamModel = currencyStreamModel;
    }
    onModuleInit() {
        this.logger.log('Binance WebSocket service initialized');
    }
    subscribeToMarketData(symbol, callback) {
        const lowerSymbol = symbol.toLowerCase();
        if (!this.subscriptionCallbacks.has(lowerSymbol)) {
            this.subscriptionCallbacks.set(lowerSymbol, new Set());
        }
        this.subscriptionCallbacks.get(lowerSymbol)?.add(callback);
        if (!this.websockets.has(lowerSymbol)) {
            const wsEndpoint = `${this.baseUrl}${lowerSymbol}@kline_1m`;
            const ws = new WebSocket(wsEndpoint);
            ws.on('open', () => {
                this.logger.log(`Connected to Binance WebSocket for ${symbol}`);
            });
            ws.on('message', (data) => {
                try {
                    const parsedData = JSON.parse(data.toString());
                    this.storeCurrencyStream(parsedData);
                    const callbacks = this.subscriptionCallbacks.get(lowerSymbol);
                    if (callbacks) {
                        callbacks.forEach((cb) => cb(parsedData));
                    }
                }
                catch (error) {
                    this.logger.error(`Error parsing Binance data: ${error.message}`);
                }
            });
            ws.on('error', (error) => {
                this.logger.error(`WebSocket error for ${symbol}: ${error.message}`);
            });
            ws.on('close', () => {
                this.logger.log(`Disconnected from Binance WebSocket for ${symbol}`);
                this.websockets.delete(lowerSymbol);
            });
            this.websockets.set(lowerSymbol, ws);
        }
    }
    subscribeToMarketDataOnce(symbol, callback) {
        const lowerSymbol = symbol.toLowerCase();
        const wsEndpoint = `${this.baseUrl}${lowerSymbol}@kline_1m`;
        const ws = new WebSocket(wsEndpoint);
        ws.on('open', () => {
            this.logger.log(`Connected to Binance WebSocket for one-time data: ${symbol}`);
        });
        ws.on('message', (data) => {
            try {
                const parsedData = JSON.parse(data.toString());
                callback(parsedData);
                ws.close();
            }
            catch (error) {
                this.logger.error(`Error parsing Binance data: ${error.message}`);
                ws.close();
            }
        });
        ws.on('error', (error) => {
            this.logger.error(`WebSocket error for ${symbol}: ${error.message}`);
            ws.close();
        });
    }
    unsubscribeFromMarketData(symbol) {
        const lowerSymbol = symbol.toLowerCase();
        if (this.websockets.has(lowerSymbol)) {
            const ws = this.websockets.get(lowerSymbol);
            ws.close();
            this.websockets.delete(lowerSymbol);
            this.subscriptionCallbacks.delete(lowerSymbol);
            this.logger.log(`Unsubscribed from ${symbol} market data`);
        }
    }
    async storeCurrencyStream(data) {
        try {
            const createdStream = new this.currencyStreamModel(data);
            await createdStream.save();
        }
        catch (error) {
            this.logger.error(`Error storing currency stream data: ${error.message}`);
        }
    }
    async createCurrencyStream(currencyStream) {
        const createdCurrencyStream = new this.currencyStreamModel(currencyStream);
        return createdCurrencyStream;
    }
    async findAllCurrencyStreams() {
        return this.currencyStreamModel.find().exec();
    }
    async findCurrencyStreamById(id) {
        return this.currencyStreamModel.findById(id).exec();
    }
};
exports.MsBinanceService = MsBinanceService;
exports.MsBinanceService = MsBinanceService = MsBinanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(currency_stream_schema_1.CurrencyStream.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MsBinanceService);
//# sourceMappingURL=ms-binance.service.js.map