import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const { session } = context.switchToHttp().getRequest();
    const { user } = session;

    return user.id;
  }
);