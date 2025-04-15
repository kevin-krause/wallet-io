import { Test, TestingModule } from '@nestjs/testing';
import { MsBinanceController } from './ms-binance.controller';
import { MsBinanceService } from './ms-binance.service';

describe('MsBinanceController', () => {
  let msBinanceController: MsBinanceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MsBinanceController],
      providers: [MsBinanceService],
    }).compile();

    msBinanceController = app.get<MsBinanceController>(MsBinanceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(msBinanceController.getHello()).toBe('Hello World!');
    });
  });
});
