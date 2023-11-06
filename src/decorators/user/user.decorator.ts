import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { isUUID } from 'class-validator';

export const User = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user || !user.userId || !isUUID(user.userId, '4'))
    throw new UnauthorizedException();

  const prisma = new PrismaClient();

  return await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });
});
