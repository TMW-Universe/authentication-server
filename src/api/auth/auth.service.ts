import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { WrongCredentialsException } from 'src/errors/auth/wrong-credentials.exception';
import { compareHashWithSalt } from 'src/utils/cryptography/cryptography';
import { JwtService } from '@nestjs/jwt';
import { getEnv } from 'src/utils/config/get-env';
import { DomainNotAllowedException } from 'src/errors/domain/domain-not-allowed.exception';
import { LogRepository } from 'src/database/repositories/logs/log.repository';
import { LogType } from 'src/database/entities/logs/log.entity';
import { uuid } from 'src/types/generic/uuid.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly logRepository: LogRepository,
  ) {}

  async login(
    credentials: {
      username: string;
      password: string;
      twoFaCode?: string;
      domain: string;
    },
    req: {
      request: Request;
      ip: string;
    },
  ) {
    const user = await this.userRepository.findUserByUsername(
      credentials.username,
    );

    const { allowedDomains } = getEnv();
    if (!allowedDomains.includes(credentials.domain))
      throw new DomainNotAllowedException();

    // If user is not found
    if (!user) throw new WrongCredentialsException();

    if (
      compareHashWithSalt(user.getDataValue('password'), credentials.password)
    ) {
      // First check for 2FA

      if (user.getDataValue('twoFaToken')) {
        // If 2FA is enabled

        if (!credentials.twoFaCode) {
          // If the user has not provided a 2FA code
          return { requires2Fa: true };
        }
      }

      // Log sign in
      await this.log(
        LogType.LOGIN,
        user.getDataValue('id'),
        req.request,
        req.ip,
      );

      // Generate token

      const payload = {
        domains: [credentials.domain],
        userId: user.getDataValue('id'),
      };

      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new WrongCredentialsException();
    }
  }

  async log(type: LogType, userId: uuid, request: Request, ip: string) {
    return await this.logRepository.create({
      type,
      userId,
      address: ip,
      userAgent: request.headers['user-agent'] ?? null,
      origin: request.headers['origin'],
    });
  }
}
