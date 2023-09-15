import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { UserEntity } from 'src/database/entities/user.entity';

export const User = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user || !user.userId || !isUUID(user.userId, '4'))
    throw new UnauthorizedException();

  return (await UserEntity.findByPk(user.userId)).get();
});
