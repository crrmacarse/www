import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { LocalAuthGuard } from 'guards/local-auth.guard';
import { RolesGuard } from 'guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from 'guards/permission.guard';
import { Roles } from 'decorators/roles.decorator';
import { Permissions } from 'decorators/permissions.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    /**
     * @TODO: Could have a better approach on useGuards
     * like extending authGuard inside Roles/Permission guard
     */
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get('guarded')
    getGuarded(@Request() req) {
        return {
            status: 'success',
            user: req.user,
        };
    }

    @UseGuards(AuthGuard('jwt'), PermissionGuard)
    @Permissions('write')
    @Get('permissions')
    getPermission(@Request() req) {
        return {
            status: 'success',
            message: 'You have write access',
            user: req.user,
        };
    }
}
