import { Body, Controller, Post } from '@nestjs/common';
import { TransferCredentialsDTO } from './dtos/transfer-credentials.dto';
import { ReadTransferCredentialsDTO } from './dtos/read-transfer-credentials.dto';
import { TransferCredentialsService } from './transfer-credentials.service';

@Controller('auth/transfer-credentials')
export class TransferCredentialsController {
  constructor(
    private readonly transferCredentialsService: TransferCredentialsService,
  ) {}

  @Post('create-transfer')
  async createCredentialsTransfer() {}

  @Post('transfer')
  async transferCredentials(@Body() body: TransferCredentialsDTO) {}

  @Post('read')
  async readTransferCredentials(@Body() body: ReadTransferCredentialsDTO) {}
}
