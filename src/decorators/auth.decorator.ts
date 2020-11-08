import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { roleType } from './roles.decorator';

export type authType = {
    username: string,
    roles: roleType[],
};

/**
 * Type-safe access of of request context
 * 
 * USAGE:
 * 
 * @Get()
 * async findOne(@Auth('username') username: string) {
 *  console.log(`Hello ${username}`);
 * }
 */
export const Auth = createParamDecorator(
  (key: keyof authType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const auth: authType = request.user;

    return key ? auth && auth[key] : auth;
  },
);