import { UserPreferencesAttributes } from 'src/database/entities/user-preferences.entity';

export interface UserProfileModel {
  id: string;
  name: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  username: string;
  preferences: Omit<UserPreferencesAttributes, 'id' | 'user' | 'userId'>;
}
