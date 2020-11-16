import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { permissionType } from 'decorators/permissions.decorator';
import { jwtPayloadType } from 'auth/auth.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const routePermissions = this.reflector.get<permissionType[]>(
            'permissions',
            context.getHandler(),
        );

        if (!routePermissions) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const { profile }: jwtPayloadType = request.user;
        const { permissions: userPermissions } = profile;

        const hasPermission = () =>
            routePermissions.every(routePermission =>
                userPermissions.includes(routePermission),
            );

        return hasPermission();
    }
}