import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ParametersService {
  private logger = new Logger('ParametersService');

  constructor() {}
  async healthCheck() {
    this.logger.log('Health check ❤️‍🩹');
    return 'OK';
  }
}
