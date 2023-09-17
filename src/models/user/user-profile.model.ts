import { uuid } from '@tmw-universe/tmw-universe-types';
import { UserPreferencesAttributes } from 'src/database/entities/user-preferences.entity';

export interface UserProfileModel {
  id: uuid;
  name: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  username: string;
  preferences: Omit<
    UserPreferencesAttributes,
    'id' | 'user' | 'userId' | 'createdAt' | 'updatedAt'
  >;
}
