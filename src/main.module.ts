import { Module } from '@nestjs/common';
import { AppModule, AppConfigModule } from 'app';
import { AuthModule } from 'auth';
import { DatabaseModule } from 'database';
import { HealthModule } from 'health';
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
    ResourceModule,
    UploadModule,
  ],
})
export class MainModule { }