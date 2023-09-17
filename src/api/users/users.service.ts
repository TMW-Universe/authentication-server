import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserPreferencesEntity } from 'src/database/entities/user-preferences.entity';
import { UserProfileEntity } from 'src/database/entities/user-profile.entity';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserProfileModel } from 'src/models/user/user-profile.model';
import { uuid } from 'src/types/generic/uuid.type';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async getUserProfile(userId: string) {
    const user = (await this.getUserAndProfileAndPreferencesById(userId)).get();
    if (!user) throw new InternalServerErrorException();
    const profile = user.userProfile.get();

    const {
      userId: _userId,
      user: _user,
      id: _id,
      ...preferences
    } = user.userPreferences.get();

    return {
      id: user.id,
      name: profile.name,
      firstSurname: profile.firstSurname,
      secondSurname: profile.secondSurname,
      email: profile.email,
      username: user.username,
      preferences,
    } as UserProfileModel;
  }

  async getUserById(userId: uuid) {
    return await this.usersRepository.findUserById(userId);
  }

  async getUserAndProfileAndPreferencesById(userId: uuid) {
    return await this.usersRepository.findUserById(userId, {
      include: [
        { model: UserProfileEntity, required: true },
        { model: UserPreferencesEntity, required: false },
      ],
    });
  }
}
