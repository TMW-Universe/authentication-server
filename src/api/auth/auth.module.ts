import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/database/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { getEnv } from 'src/utils/config/get-env';

@Module({
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        const { jwtSecret } = getEnv();

        if (jwtSecret.length < 32)
          throw new Error(
            "JWT Secret is not secure enought. It's length must be at least 32 characters.",
          );

        return {
          global: true,
          signOptions: { expiresIn: '45d' },
          secret: jwtSecret,
        };
      },
    }),
  ],
})
export class AuthModule {}
