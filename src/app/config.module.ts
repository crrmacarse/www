import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppConfigService } from './config.service';
import configuration from './configuration';
import { DEFAULT_APP_NAME, DEFAULT_APP_URL, DEFAULT_APP_PORT } from 'constants/default';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default(DEFAULT_APP_NAME),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        APP_URL: Joi.string().default(DEFAULT_APP_URL),
        APP_PORT: Joi.number().default(DEFAULT_APP_PORT),
        APP_KEY: Joi.string().required(),
        APP_REFRESH_KEY: Joi.string().required(),
        DEBUG: Joi.boolean().sensitive(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}