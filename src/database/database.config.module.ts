import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppConfigModule } from 'app';
import databaseConfiguration from './configuration';
import { DatabaseConfigService } from './database.config.service';

@Module({
    imports: [
        AppConfigModule,
        ConfigModule.forRoot({
            load: [databaseConfiguration],
            validationSchema: Joi.object({
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
            })
        }),
    ],
    providers: [ConfigService, DatabaseConfigService],
    exports: [ConfigService, DatabaseConfigService],
})
export class DatabaseConfigModule { }