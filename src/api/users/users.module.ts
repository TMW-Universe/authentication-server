import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserProfileRepository } from '../../database/repositories/user-profile.repository';
import { AuthService } from '../auth/auth.service';
import { LogRepository } from '../../database/repositories/logs/log.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    LogRepository,
    UserRepository,
    UserProfileRepository,
  ],
})
export class UsersModule {}
