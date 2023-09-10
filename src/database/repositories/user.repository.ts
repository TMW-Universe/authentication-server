import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  async findUserByUsername(username: string, options?: RepositoryOptions) {
    return await UserEntity.findOne({ where: { username }, ...options });
  }
}
