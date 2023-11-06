import { UserPreference } from '@prisma/client';
import { uuid } from '@tmw-universe/tmw-universe-types';

export interface UserProfileModel {
  id: uuid;
  name: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  username: string;
  preferences: Omit<
    UserPreference,
    'id' | 'user' | 'userId' | 'createdAt' | 'updatedAt'
  >;
}
