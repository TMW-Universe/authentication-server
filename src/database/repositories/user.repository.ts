import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { uuid } from 'src/types/generic/uuid.type';

@Injectable()
export class UserRepository {
  async findUserByUsername(username: string, options?: RepositoryOptions) {
    return await UserEntity.findOne({ where: { username }, ...options });
  }

  async findUserById(userId: uuid, options?: RepositoryOptions) {
    return await UserEntity.findOne({
      where: { id: userId },
      ...options,
    });
  }

  async getUsersById(usersId: uuid[], options?: RepositoryOptions) {
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
