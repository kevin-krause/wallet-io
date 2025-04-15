import { NestFactory } from '@nestjs/core';
import { MsQuantModule } from './ms-quant.module';

async function bootstrap() {
  const app = await NestFactory.create(MsQuantModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
