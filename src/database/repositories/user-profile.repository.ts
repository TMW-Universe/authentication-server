import { Injectable } from '@nestjs/common';
import { uuid } from 'src/types/generic/uuid.type';
import { UserProfileEntity } from '../entities/user-profile.entity';
import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';

@Injectable()
export class UserProfileRepository {
  async findByUserId(userId: uuid, options?: RepositoryOptions) {
    return await UserProfileEntity.findOne({ where: { userId }, ...options });
  }
}
