import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [AuthModule],
})
export class ApiModule {}
