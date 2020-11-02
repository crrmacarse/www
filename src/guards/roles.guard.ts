import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roleType } from 'decorators/roles.decorator'
import { jwtPayloadType } from 'auth/auth.service'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<roleType[]>('roles', context.getHandler());

        /**
         * Return true if there is no declaration of roles inside metadata. It onyls means
         * that it isn't auth protected.
         * 
         * Example Usage:
         * Roles('admin')
         */
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const { profile }: jwtPayloadType = request.user;

        return this.matchRoles(roles, profile.roles)
    }

    private matchRoles(roles: roleType[], userRoles: string[]): boolean {
        for (const role of roles) {
            if (userRoles.includes(role)) {
                return true;
            }
        }

        /**
         * Note that behind the scenes, when a guard returns false,
         * the framework throws a ForbiddenException
         */
        return false;
    }

}
