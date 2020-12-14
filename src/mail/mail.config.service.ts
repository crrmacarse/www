import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { AppConfigService } from 'app';

@Injectable()
export class MailConfigService {
    constructor(
        private configService: ConfigService,
        private appConfigService: AppConfigService,
    ) { }

    private mailDefaultTemplatePath = join(process.cwd(), 'templates');
    private mailTemplatePartialsPath = join(process.cwd(), 'templates/partials');
    private mailDefaultFrom = '"Team XtendOps" <no-reply@xtendops.us>';

    get service(): string {
        return this.configService.get<string>('mail.service');
    }

    get username(): string {
        return this.configService.get<string>('mail.username');
    }

    get password(): string {
        return this.configService.get<string>('mail.password');
    }

    get transport(): MailerOptions['transport'] {
        return {
            service: this.service,
            auth: {
                user: this.username,
                pass: this.password,
            },
        };
    }

    get mailConfig(): MailerOptions {
        return {
            transport: this.transport,
            defaults: {
                from: this.mailDefaultFrom,
            },
            template: {
                dir: this.mailDefaultTemplatePath,
                adapter: new EjsAdapter(),
                options: {
                    strict: true,
                }
            },
            options: {
                partials: {
                    dir: this.mailTemplatePartialsPath,
                }
            },
            preview: this.appConfigService.debug,
        };
    }
}