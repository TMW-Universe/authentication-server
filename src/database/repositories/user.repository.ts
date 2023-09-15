import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

@Injectable()
export class UserRepository {
  async findUserByUsername(username: string, options?: RepositoryOptions) {
    return await UserEntity.findOne({ where: { username }, ...options });
  }

  async findUserById(userId: string, options?: RepositoryOptions) {
    return await UserEntity.findOne({ where: { id: userId }, ...options });
  }

  async getUsersById(usersId: string[], options?: RepositoryOptions) {
    return await UserEntity.findAll({
      where: {
        id: {
          [Op.in]: usersId,
        },
      },
      ...options,
    });
  }
}
