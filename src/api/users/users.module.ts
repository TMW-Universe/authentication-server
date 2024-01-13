import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserProfileRepository } from '../../database/repositories/user-profile.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserProfileRepository],
})
export class UsersModule {}
