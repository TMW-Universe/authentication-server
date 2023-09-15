import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/authentication/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { getEnv } from './utils/config/get-env';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    JwtModule.register({
      global: true,
      publicKey: getEnv().jwtPublicKey,
      privateKey: getEnv().jwtPrivateKey,
      signOptions: { expiresIn: '45d' },
    }),
    DatabaseModule,
    ApiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
