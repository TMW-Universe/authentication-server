import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Account, uuid } from '@tmw-universe/tmw-universe-types';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UpdateUserProfileName } from '../../dtos/users/update-user-profile.name.dto';
import { UserProfileRepository } from '../../database/repositories/user-profile.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async getUserProfile(userId: string) {
    const user = await this.getUserAndProfileAndPreferencesById(userId);
    if (!user) throw new InternalServerErrorException();
    const profile = user.UserProfile[0];

    const preferences = user.UserPreference[0];

    return {
      id: user.id,
      name: profile.name,
      firstSurname: profile.firstSurname,
      secondSurname: profile.secondSurname,
      email: profile.email,
      username: user.username,
      birthDate: profile.birthDate,
      preferences: {
        color: preferences?.color,
        theme: preferences?.theme,
        language: preferences?.language,
        currency: preferences?.currency,
        weightUnit: preferences?.weightUnit,
        dateFormat: preferences?.dateFormat,
      },
    } as Account;
  }

  async getUserById(userId: uuid) {
    return await this.usersRepository.findUserById(userId);
  }

  async getUserAndProfileAndPreferencesById(userId: uuid) {
    return await this.usersRepository.findUserByIdIncludingProfileAndPreferences(
      userId,
    );
  }

  async updateUserProfileName(
    userId: uuid,
    userProfileName: UpdateUserProfileName,
  ) {
    return await this.userProfileRepository.updateProfileByUserId(
      userId,
      userProfileName,
    );
  }
}
