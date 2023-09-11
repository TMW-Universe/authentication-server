import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';
import { DomainsModule } from './domains/domains.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [AuthModule, DomainsModule],
})
export class ApiModule {}
