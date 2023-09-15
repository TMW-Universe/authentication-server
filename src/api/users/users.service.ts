import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserProfileModel } from 'src/models/user/user-profile.model';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async getUserProfile(userId: string) {
    const user = (await this.getUserById(userId)).get();

    return {
      id: user.id,
      name: user.name,
      firstSurname: user.firstSurname,
      secondSurname: user.secondSurname,
      email: user.email,
      username: user.username,
    } as UserProfileModel;
  }

  async getUserById(userId: string) {
    return await this.usersRepository.findUserById(userId);
  }
}
