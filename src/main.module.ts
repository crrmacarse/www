import { Module } from '@nestjs/common';
import { AppModule, AppConfigModule } from 'app';
import { AuthModule } from 'auth';
import { DatabaseModule } from 'database';
import { HealthModule } from 'health';
import { MailModule } from 'mail';
import { LoggerModule } from 'logger';
import { ResourceModule } from 'resources';
import { UploadModule } from 'upload';
import { FeatureModule } from './feature.module';

@Module({
  imports: [
    AppModule,
    AppConfigModule,
    AuthModule,
    FeatureModule,
    DatabaseModule,
    HealthModule,
    MailModule,
    LoggerModule,
    ResourceModule,
    UploadModule,
  ],
})
export class MainModule { }