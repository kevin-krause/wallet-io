"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsBinanceModule = exports.getConnectionToken = void 0;
const common_1 = require("@nestjs/common");
const ms_binance_gateway_1 = require("./ms-binance.gateway");
const ms_binance_service_1 = require("./ms-binance.service");
const currency_stream_schema_1 = require("./schemas/currency-stream.schema");
const getConnectionToken = (name) => `${name}Connection`;
exports.getConnectionToken = getConnectionToken;
let MsBinanceModule = class MsBinanceModule {
};
exports.MsBinanceModule = MsBinanceModule;
exports.MsBinanceModule = MsBinanceModule = __decorate([
    (0, common_1.Module)({
        controllers: [ms_binance_gateway_1.MsBinanceGateway],
        providers: [
            ms_binance_service_1.MsBinanceService,
            {
                provide: (0, exports.getConnectionToken)('CurrencyStream'),
                useValue: currency_stream_schema_1.CurrencyStreamSchema,
            },
        ],
    })
], MsBinanceModule);
//# sourceMappingURL=ms-binance.module.js.map