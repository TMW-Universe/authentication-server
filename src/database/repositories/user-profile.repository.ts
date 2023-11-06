import { Injectable } from '@nestjs/common';
import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';
import { uuid } from '@tmw-universe/tmw-universe-types';
import { DatabaseService } from '../database.service';

@Injectable()
export class UserProfileRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByUserId(userId: uuid, options?: RepositoryOptions) {
    return await (
      options?.transaction ?? this.databaseService
    ).userProfile.findFirst({
      where: {
        userId,
      },
    });
  }
}
