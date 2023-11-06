import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { uuid } from '@tmw-universe/tmw-universe-types';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserProfileModel } from 'src/models/user/user-profile.model';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

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
      preferences: {
        color: preferences?.color,
        theme: preferences?.theme,
        language: preferences?.language,
        currency: preferences?.currency,
        weightUnit: preferences?.weightUnit,
      },
    } as UserProfileModel;
  }

  async getUserById(userId: uuid) {
    return await this.usersRepository.findUserById(userId);
  }

  async getUserAndProfileAndPreferencesById(userId: uuid) {
    return await this.usersRepository.findUserByIdIncludingProfileAndPreferences(
      userId,
    );
  }
}
