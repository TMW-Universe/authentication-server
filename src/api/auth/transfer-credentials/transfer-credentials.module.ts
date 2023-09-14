import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TransferCredentialsController } from './transfer-credentials.controller';
import { TransferCredentialsService } from './transfer-credentials.service';

@Module({
  controllers: [TransferCredentialsController],
  providers: [TransferCredentialsService],
  imports: [CacheModule.register()],
})
export class TransferCredentialsModule {}
