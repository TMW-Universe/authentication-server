import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle(8, 30000)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }
}
