import { Module } from '@nestjs/common';
import { AppController, AppService } from './app';
import { FeatureModule } from './feature.module';
import { ResourceModule } from './resources';

@Module({
  imports: [FeatureModule, ResourceModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }