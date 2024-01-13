import { Body, Controller, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/decorators/user/user.decorator';
import { UserProfile } from '@prisma/client';
import { UpdateUserProfileName } from '../../dtos/users/update-user-profile.name.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@User() user: UserProfile) {
    return await this.usersService.getUserProfile(user.id);
  }

  @Put('profile/name')
  async updateUserProfile(
    @User() { userId }: UserProfile,
    @Body() body: UpdateUserProfileName,
  ) {
    return await this.usersService.updateUserProfileName(userId, body);
  }
}
