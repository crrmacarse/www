import { Module } from '@nestjs/common';
import { AppController, AppService, AppConfigModule } from 'app';
import { AuthModule } from 'auth';
import { DatabaseModule } from 'database';
import { HealthModule } from 'health';
import { ResourceModule } from 'resources';
import { FeatureModule } from './feature.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    FeatureModule,
    DatabaseModule,
    HealthModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }