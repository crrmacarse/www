import { 
    Controller, Request, Post,
    UseGuards, Get, Body, UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { LocalAuthGuard } from 'guards/local-auth.guard';
import { PermissionGuard } from 'guards/permission.guard';
import { Permissions } from 'decorators/permissions.decorator';
import { JWT_REFRESH_TOKEN_EXPIRATION } from 'constants/default';
import { AuthService } from './auth.service';
import { ChangePasswordDto, LoginDto, RefreshTokenDto } from './auth.dto';

@Controller('auth')
@ApiTags('account')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        description: 'Returns currently authenticated user.'
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAuth(@Request() req) {
        return req.user;
    }

    @ApiOperation({
        description: `Returns access and refresh token. All Authorized requests will be utilizing access token
        while refresh token will be used to request new access token. Keep both securely.`,
    })
    @ApiBody({ type: LoginDto, description: 'The "uid" accepts either username or company email.' })
    @ApiCreatedResponse({
        schema: { example: { accessToken: '', refreshToken: '', timestamp: new Date().toISOString() } }
    })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        const response = await this.authService.login(req.user);
        const cookie =
            `refresh_token=${response.refreshToken}; HttpOnly; Path=/; Max-Age=${JWT_REFRESH_TOKEN_EXPIRATION}`;

        req.res.setHeader('Set-Cookie', cookie);

        return response;
    }

    @ApiOperation({
        description: 'Request a new access token via payload.',
    })
    @ApiCreatedResponse({
        schema: { example: { accessToken: '', timestamp: new Date().toISOString() } }
    })
    @Post('refresh')
    async regenerateToken(@Body() { refreshToken }: RefreshTokenDto) {
        return this.authService.regenerateToken(refreshToken);
    }

    @ApiOperation({
        description: 'Request a new access token via cookies.',
    })
    @ApiCreatedResponse({
        schema: { example: { accessToken: '', timestamp: new Date().toISOString() } }
    })
    @Get('challenge')
    async challengeToken(@Request() req) {
        return this.authService.regenerateToken(req.cookies.refresh_token);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(@Request() req, @Body() { oldPassword, newPassword }: ChangePasswordDto) {
        return this.authService.changePassword(req.user, oldPassword, newPassword);
    }

    @ApiBearerAuth()
    @Post('forgot-password')
    async forgotPassword(@Body('email') email: string) {
        return this.authService.forgotPassword(email);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Request() req) {
        const cookie = 'refresh_token=; HttpOnly; Path=/; Max-Age=0';

        req.res.setHeader('Set-Cookie', cookie);

        return this.authService.logout(req.user);
    }

    @ApiOperation({
        description: 'Test if you have ADMN privilege'
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Permissions('read')
    @Get('privileges-test')
    getPermission(@Request() req) {
        return {
            message: 'Permission read access granted',
            account: req.user,
        };
    }
}
