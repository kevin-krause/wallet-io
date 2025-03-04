import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WorkerService {
  private logger = new Logger('WorkerService');

  constructor() {}

  async healthCheck() {
    this.logger.log('Health check ❤️‍🩹');
    return 'OK';
  }
}
