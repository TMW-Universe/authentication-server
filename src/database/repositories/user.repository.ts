import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';
import { Injectable } from '@nestjs/common';
import { uuid } from '@tmw-universe/tmw-universe-types';
import { DatabaseService } from '../database.service';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUserByUsername(username: string, options?: RepositoryOptions) {
    return await (options?.transaction ?? this.databaseService).user.findFirst({
      where: { username },
    });
  }

  async findUserById(userId: uuid, options?: RepositoryOptions) {
    return await (options?.transaction ?? this.databaseService).user.findUnique(
      {
        where: {
          id: userId,
        },
      },
    );
  }

  async findUserByIdIncludingProfileAndPreferences(
    userId: uuid,
    options?: RepositoryOptions,
  ) {
    return await (options?.transaction ?? this.databaseService).user.findUnique(
      {
        where: {
          id: userId,
        },
        include: {
          UserProfile: true,
          UserPreference: true,
        },
      },
    );
  }

  async getUsersById(usersId: uuid[], options?: RepositoryOptions) {
    return await (options?.transaction ?? this.databaseService).user.findMany({
      where: {
        id: {
          in: usersId,
        },
      },
    });
  }
}
