import { Module } from '@nestjs/common';
import { MsBinanceGateway } from './ms-binance.gateway';
import { MsBinanceService } from './ms-binance.service';
import { CurrencyStreamSchema } from './schemas/currency-stream.schema';

export const getConnectionToken = (name: string) => `${name}Connection`;

@Module({
  controllers: [MsBinanceGateway],
  providers: [
    MsBinanceService,
    {
      provide: getConnectionToken('CurrencyStream'),
      useValue: CurrencyStreamSchema,
    },
  ],
})
export class MsBinanceModule {}
