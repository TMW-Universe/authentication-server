import { Body, Controller, Post } from '@nestjs/common';
import { TransferCredentialsDTO } from './dtos/transfer-credentials.dto';
import { ReadTransferCredentialsDTO } from './dtos/read-transfer-credentials.dto';
import { TransferCredentialsService } from './transfer-credentials.service';
import { Throttle } from '@nestjs/throttler';

@Controller('auth/transfer-credentials')
export class TransferCredentialsController {
  constructor(
    private readonly transferCredentialsService: TransferCredentialsService,
  ) {}

  @Throttle({
    default: {
      limit: 50,
      ttl: 120000,
    },
  })
  @Post('create-transfer')
  async createCredentialsTransfer() {
    return await this.transferCredentialsService.createCredentialsTransfer();
  }

  @Post('transfer')
  async transferCredentials(@Body() body: TransferCredentialsDTO) {
    return await this.transferCredentialsService.transferCredentials(
      body.key,
      body.accessToken,
    );
  }

  @Post('read')
  async readTransferCredentials(@Body() body: ReadTransferCredentialsDTO) {
    return await this.transferCredentialsService.readTransferCredentials(
      body.key,
    );
  }
}
