import { Injectable } from '@nestjs/common';
import { UserProfileEntity } from '../entities/user-profile.entity';
import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';
import { uuid } from '@tmw-universe/tmw-universe-types';

@Injectable()
export class UserProfileRepository {
  async findByUserId(userId: uuid, options?: RepositoryOptions) {
    return await UserProfileEntity.findOne({ where: { userId }, ...options });
  }
}
