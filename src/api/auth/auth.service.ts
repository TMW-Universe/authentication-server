import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(credentials: {
    username: string;
    password: string;
    twoFaCode?: string;
  }) {}
}
