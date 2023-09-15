import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserProfileEntity } from 'src/database/entities/user-profile.entity';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserProfileModel } from 'src/models/user/user-profile.model';
import { uuid } from 'src/types/generic/uuid.type';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async getUserProfile(userId: string) {
    const user = (await this.getUserAndProfileById(userId)).get();
    const profileEntity = user.userProfile;
    if (!profileEntity) throw new InternalServerErrorException();
    const profile = profileEntity.get();

    return {
      id: user.id,
      name: profile.name,
      firstSurname: profile.firstSurname,
      secondSurname: profile.secondSurname,
      email: profile.email,
      username: user.username,
    } as UserProfileModel;
  }

  async getUserById(userId: uuid) {
    return await this.usersRepository.findUserById(userId);
  }

  async getUserAndProfileById(userId: uuid) {
    return await this.usersRepository.findUserById(userId, {
      include: [UserProfileEntity],
    });
  }
}
