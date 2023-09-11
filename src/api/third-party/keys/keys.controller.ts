import { Controller, Get } from '@nestjs/common';
import { KeysService } from './keys.service';
import { Throttle } from '@nestjs/throttler';

@Controller('third-api/keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Throttle(30, 10000)
  @Get('public-key')
  async getPublicKey() {
    return await this.keysService.getPublicKey();
  }
}
