import { Injectable } from '@nestjs/common';

@Injectable()
export class MsQuantService {
  getHello(): string {
    return 'Hello World!';
  }
}
