import { Queue } from 'bullmq';
import { IQueueService } from '../queue-service.interface';
import { IDomainEvent } from '../domain-event.interface';
import { Logger } from '@nestjs/common';

export class BullMqQueueService implements IQueueService {
  private logger = new Logger(BullMqQueueService.name);

  constructor(private readonly queue: Queue) {}

  async add(event: IDomainEvent): Promise<void> {
    try {
      await this.queue.add(event.name, event);
    } catch (error) {
      this.logger.error(error, 'BullMqQueueService.add');
    }
  }
}
