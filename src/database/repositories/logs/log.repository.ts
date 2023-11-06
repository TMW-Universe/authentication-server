import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';

@Injectable()
export class LogRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    log: Prisma.LogUncheckedCreateInput,
    options?: RepositoryOptions,
  ) {
    await (options?.transaction ?? this.databaseService).log.create({
      data: log,
    });
  }
}
