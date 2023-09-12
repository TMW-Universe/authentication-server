import { Module } from '@nestjs/common';
import { TransferCredentialsController } from './transfer-credentials.controller';
import { TransferCredentialsService } from './transfer-credentials.service';

@Module({
  controllers: [TransferCredentialsController],
  providers: [TransferCredentialsService],
})
export class TransferCredentialsModule {}
