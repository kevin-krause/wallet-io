import { Test, TestingModule } from '@nestjs/testing';
import { MsQuantController } from './ms-quant.controller';
import { MsQuantService } from './ms-quant.service';

describe('MsQuantController', () => {
  let msQuantController: MsQuantController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MsQuantController],
      providers: [MsQuantService],
    }).compile();

    msQuantController = app.get<MsQuantController>(MsQuantController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(msQuantController.getHello()).toBe('Hello World!');
    });
  });
});
