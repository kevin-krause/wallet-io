import { Module } from '@nestjs/common';
import { MsQuantController } from './ms-quant.controller';
import { MsQuantService } from './ms-quant.service';

@Module({
  imports: [],
  controllers: [MsQuantController],
  providers: [MsQuantService],
})
export class MsQuantModule {}
