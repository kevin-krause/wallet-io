import { Module } from '@nestjs/common';
import { ParametersController } from './parameters/parameters.controller';
import { WalletController } from './wallet/wallet.controller';
import { WorkerController } from './workers/worker.controller';
import { ParametersService } from './parameters/services/parameters.service';
import { WalletService } from './wallet/services/wallet.service';
import { WorkerService } from './workers/services/worker.service';

@Module({
  imports: [],
  providers: [ParametersService, WalletService, WorkerService],
  controllers: [ParametersController, WalletController, WorkerController],
})
export class AppModule {}
