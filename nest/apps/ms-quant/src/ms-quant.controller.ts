import { Controller, Get } from '@nestjs/common';
import { MsQuantService } from './ms-quant.service';

@Controller()
export class MsQuantController {
  constructor(private readonly msQuantService: MsQuantService) {}

  @Get()
  getHello(): string {
    return this.msQuantService.getHello();
  }
}
