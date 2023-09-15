import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { WrongCredentialsException } from 'src/errors/auth/wrong-credentials.exception';
import { compareHashWithSalt } from 'src/utils/cryptography/cryptography';
import { JwtService } from '@nestjs/jwt';
import { getEnv } from 'src/utils/config/get-env';
import { DomainNotAllowedException } from 'src/errors/domain/domain-not-allowed.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: {
    username: string;
    password: string;
    twoFaCode?: string;
    domain: string;
  }) {
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

      // Generate token

      const payload = {
        domains: [credentials.domain],
        userId: user.getDataValue('id'),
      };

      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } else throw new WrongCredentialsException();
  }
}
