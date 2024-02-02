import { Body, Controller, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/decorators/user/user.decorator';
import { User as UserModel } from '@prisma/client';
import { UpdateUserProfileNameDTO } from '../../dtos/users/update-user-profile.name.dto';
import { UpdateUserProfileBirthdateDTO } from '../../dtos/users/update-user-profile-birthdate.dto';
import { UpdateAccountPasswordDTO } from '../../dtos/accounts/update-account-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@User() user: UserModel) {
    return await this.usersService.getUserProfile(user.id);
  }

  @Put('profile/name')
  async updateUserProfileName(
    @User() { id }: UserModel,
    @Body() body: UpdateUserProfileNameDTO,
  ) {
    return await this.usersService.updateUserProfileName(id, body);
  }

  @Put('profile/birthdate')
  async updateUserProfileBirthdate(
    @User() { id }: UserModel,
    @Body() body: UpdateUserProfileBirthdateDTO,
  ) {
    return await this.usersService.updateUserProfileBirthdate(id, body);
  }

  @Put('account/password')
  async updateAccountPassword(
    @User() { id }: UserModel,
    @Body() { password }: UpdateAccountPasswordDTO,
  ) {
    return await this.usersService.updateAccountPassword(id, password);
  }
}
