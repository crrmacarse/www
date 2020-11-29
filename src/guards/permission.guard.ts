import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { jwtPayloadType } from 'auth/auth.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const routePermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler(),
        );

        if (!routePermissions) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const { profile }: jwtPayloadType = request.user;
        const userPermissions = profile.permissions.map((p) => p.code);

        const hasPermission = () =>
            routePermissions.every(routePermission =>
                userPermissions.includes(routePermission),
            );

        return hasPermission();
    }
}