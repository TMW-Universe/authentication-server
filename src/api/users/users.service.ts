import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Account, uuid } from '@tmw-universe/tmw-universe-types';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UpdateUserProfileNameDTO } from '../../dtos/users/update-user-profile.name.dto';
import { UserProfileRepository } from '../../database/repositories/user-profile.repository';
import { UpdateUserProfileBirthdateDTO } from '../../dtos/users/update-user-profile-birthdate.dto';
import { calculatePasswordScore } from '../../utils/passwords/calsulate-password-score.util';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly authService: AuthService,
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
    userProfileName: UpdateUserProfileNameDTO,
  ) {
    return await this.userProfileRepository.updateProfileByUserId(
      userId,
      userProfileName,
    );
  }

  async updateUserProfileBirthdate(
    userId: uuid,
    { birthdate: birthDate }: UpdateUserProfileBirthdateDTO,
  ) {
    return await this.userProfileRepository.updateProfileByUserId(userId, {
      birthDate,
    });
  }

  async updateAccountPassword(
    userId: uuid,
    currentPassword: string,
    password: string,
  ) {
    if (calculatePasswordScore(password) < 5) throw new BadRequestException();

    // Check if currentPassword is the real password
    if (!(await this.authService.validatePassword(userId, currentPassword)))
      throw new UnauthorizedException();
  }
}
