import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator((data, input: ExecutionContext): User => {
  const req = input.switchToHttp().getRequest();
  return req.user;
});
