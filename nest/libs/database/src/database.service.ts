import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Collection, AnyObject } from 'mongoose';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async connect(): Promise<void> {
    try {
      await this.connection.asPromise();
      this.logger.log(`Connected to MongoDB: ${this.connection.name}`);
    } catch (error) {
      this.logger.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }

  getCollection(collectionName: string): Collection<AnyObject> {
    return this.connection.collection(collectionName);
  }
}
