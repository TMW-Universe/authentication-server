import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Ip,
  Param,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/decorators/authentication/is-public.decorator';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 7, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDTO, @Req() req: Request, @Ip() ip: string) {
    return await this.authService.login(body, {
      request: req,
      ip,
    });
  }
}
