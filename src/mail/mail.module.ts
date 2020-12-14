import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigModule } from './mail.config.module';
import { MailConfigService } from './mail.config.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [MailConfigModule],
            useFactory: async (mailConfigService: MailConfigService) => mailConfigService.mailConfig,
            inject: [MailConfigService],
        })
    ]
})
export class MailModule {}