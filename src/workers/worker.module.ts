import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import {
  // REDIS_CONNECTION,
  CYCLE_COMPLETED,
} from '../shared/events/infrastructure/redis-queue.constants';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: CYCLE_COMPLETED,
    }),
  ],
  providers: [],
  exports: [],
})
export class WorkerModule {}
