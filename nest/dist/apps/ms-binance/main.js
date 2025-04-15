"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const ms_binance_module_1 = require("./ms-binance.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(ms_binance_module_1.MsBinanceModule);
    await app.listen(process.env.port ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map