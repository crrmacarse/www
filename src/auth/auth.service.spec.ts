import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from 'resources/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule, AppConfigService } from 'app';
import { JWT_TOKEN_EXPIRATION } from 'constants/default';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
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
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
