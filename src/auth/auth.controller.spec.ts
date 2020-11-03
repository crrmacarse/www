import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_TOKEN_EXPIRATION } from 'constants/default';
import { AppConfigModule, AppConfigService } from 'app';
import { AuthController } from './auth.controller';
import { UsersModule } from 'resources/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtSrategy } from './jwt.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
          imports: [AppConfigModule],
          useFactory: async (configService: AppConfigService) => ({
            secret: configService.key,
            signOptions: { expiresIn: JWT_TOKEN_EXPIRATION },
          }),
          inject: [AppConfigService],
        }),
        AppConfigModule,
      ],
      providers: [AuthService, LocalStrategy, JwtSrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
