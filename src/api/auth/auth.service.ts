import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { WrongCredentialsException } from 'src/errors/auth/wrong-credentials.exception';
import { compareHashWithSalt } from 'src/utils/cryptography/cryptography';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(credentials: {
    username: string;
    password: string;
    twoFaCode?: string;
  }) {
    const user = await this.userRepository.findUserByUsername(
      credentials.username,
    );

    // If user is not found
    if (!user) throw new WrongCredentialsException();

    if (user.getDataValue('twoFaToken')) {
      // If 2FA is enabled

      if (!credentials.twoFaCode) {
        // If the user has not provided a 2FA code
        return { requires2Fa: true };
      }
    }

    if (
      compareHashWithSalt(user.getDataValue('password'), credentials.password)
    ) {
      return {
        accessToken: 'TOKEN',
      };
    } else throw new WrongCredentialsException();
  }
}
