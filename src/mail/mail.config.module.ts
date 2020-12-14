import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppConfigModule } from 'app';
import mailConfiguration from './configuration';
import { MailConfigService } from './mail.config.service';

@Module({
    imports: [
        AppConfigModule,
        ConfigModule.forRoot({
            load: [mailConfiguration],
            validationSchema: Joi.object({
                MAIL_SERVICE: Joi.string().required(),
                MAIL_USERNAME: Joi.string().required(),
                MAIL_PASSWORD: Joi.string().required(),
            })
        }),
    ],
    providers: [MailConfigService],
    exports: [MailConfigService],
})
export class MailConfigModule { }