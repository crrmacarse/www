/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule, AppConfigService } from 'app';
import { JWT_TOKEN_EXPIRATION } from 'constants/default';
import { AccountsModule } from 'resources/accounts/accounts.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtSrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [
    //     UserModule,
    //     PassportModule,
    //     JwtModule.registerAsync({
    //       imports: [AppConfigModule],
    //       useFactory: async (configService: AppConfigService) => ({
    //         secret: configService.key,
    //         signOptions: { expiresIn: JWT_TOKEN_EXPIRATION },
    //       }),
    //       inject: [AppConfigService],
    //     }),
    //     AppConfigModule,
    //   ],
    //   providers: [AuthService, LocalStrategy, JwtSrategy],
    //   controllers: [AuthController],
    // }).compile();

    // controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
});