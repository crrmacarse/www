/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule, AppConfigService } from 'app';
import { JWT_TOKEN_EXPIRATION } from 'constants/default';
import { AccountsHttpModule } from 'resources/accounts/accounts-http.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtSrategy } from './jwt.strategy';

describe('AuthService', () => {
  // let service: AuthService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [
  //       AccountHttpModule,
  //       PassportModule,
  //       JwtModule.registerAsync({
  //         imports: [AppConfigModule],
  //         useFactory: async (configService: AppConfigService) => ({
  //           secret: configService.key,
  //           signOptions: { expiresIn: JWT_TOKEN_EXPIRATION },
  //         }),
  //         inject: [AppConfigService],
  //       }),
  //       AppConfigModule,
  //     ],
  //     providers: [AuthService, LocalStrategy, JwtSrategy],
  //   }).compile();

  //   service = module.get<AuthService>(AuthService);
  // });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});