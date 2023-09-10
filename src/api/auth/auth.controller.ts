import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }
}
