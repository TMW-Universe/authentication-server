import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60000,
      limit: 60,
    }),
    DatabaseModule,
    ApiModule,
  ],
  providers: [],
})
export class AppModule {}
