import { Injectable } from '@nestjs/common';
import {
  LogCreateAttributes,
  LogEntity,
} from 'src/database/entities/logs/log.entity';
import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';

@Injectable()
export class LogRepository {
  async create(log: LogCreateAttributes, options?: RepositoryOptions) {
    return await LogEntity.create(log, options);
  }
}
