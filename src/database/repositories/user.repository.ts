import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';
import { UserEntity } from '../entities/user.entity';

export class UserRepository {
  async findUserByUsername(username: string, options?: RepositoryOptions) {
    return await UserEntity.findOne({ where: { username }, ...options });
  }
}
