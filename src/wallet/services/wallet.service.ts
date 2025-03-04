import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WalletService {
  private logger = new Logger('WalletService');

  constructor() {}

  async healthCheck() {
    this.logger.log('Health check ❤️‍🩹');
    return 'OK';
  }
}
