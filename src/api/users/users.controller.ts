import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/decorators/user/user.decorator';
import { UserProfile } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@User() user: UserProfile) {
    return await this.usersService.getUserProfile(user.id);
  }
}
