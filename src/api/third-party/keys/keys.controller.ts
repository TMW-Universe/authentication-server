import { Controller, Get } from '@nestjs/common';
import { KeysService } from './keys.service';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/decorators/authentication/is-public.decorator';

@Controller('third-api/keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Public()
  @Throttle({ default: { limit: 30, ttl: 10000 } })
  @Get('public-key')
  async getPublicKey() {
    return await this.keysService.getPublicKey();
  }
}
