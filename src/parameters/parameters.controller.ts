import { Controller, Get } from '@nestjs/common';
import { ParametersService } from './services/parameters.service';

@Controller('parameter')
export class ParametersController {
  constructor(private readonly parametersService: ParametersService) {}

  @Get('health')
  healthCheck() {
    return this.parametersService.healthCheck();
  }
}
    