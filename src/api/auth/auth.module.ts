import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/database/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { getEnv } from 'src/utils/config/get-env';
import { LogRepository } from 'src/database/repositories/logs/log.repository';

@Module({
  providers: [AuthService, UserRepository, LogRepository],
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        const {
          jwtPrivateKey: privateKey,
          jwtPublicKey: publicKey,
          hostname,
        } = getEnv();

        return {
          signOptions: {
            expiresIn: '45d',
            algorithm: 'RS512',
            issuer: hostname,
          },
          privateKey,
          publicKey,
        };
      },
    }),
  ],
})
export class AuthModule {}
