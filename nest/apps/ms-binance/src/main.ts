import { NestFactory } from '@nestjs/core';
import { MsBinanceModule } from './ms-binance.module';

async function bootstrap() {
  const app = await NestFactory.create(MsBinanceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
