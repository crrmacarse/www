import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roleType } from 'decorators/roles.decorator'

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

        /**
         * @TODO: attach roles in user object to be passed here.
         * remove option array
         * */ 
        const request = context.switchToHttp().getRequest();
        const user = request.user || {};

        return this.matchRoles(roles, user.roles || [])
    }

    // @TODO Initial only
    private matchRoles(roles: roleType[], userRoles: string[]): boolean {
        for (const role of roles) {
            console.log('role', role)
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
