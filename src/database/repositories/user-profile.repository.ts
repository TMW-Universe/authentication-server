import { Injectable } from '@nestjs/common';
import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';
import { uuid } from '@tmw-universe/tmw-universe-types';
import { DatabaseService } from '../database.service';
import { Prisma } from '@prisma/client';

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

  async updateProfileByUserId(
    userId: uuid,
    profile: Prisma.UserProfileUncheckedUpdateInput,
    options?: RepositoryOptions,
  ) {
    return await (options?.transaction ?? this,
    this.databaseService).userProfile.update({
      where: {
        userId,
      },
      data: profile,
    });
  }
}
