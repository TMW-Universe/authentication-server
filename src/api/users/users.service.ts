import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async getUserProfile(userId: string) {
    return await this.usersRepository.findUserById(userId);
  }
}
