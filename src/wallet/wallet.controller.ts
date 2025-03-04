import { Controller, Get } from '@nestjs/common';
import { WalletService } from './services/wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('health')
  healthCheck() {
    return this.walletService.healthCheck();
  }
}
