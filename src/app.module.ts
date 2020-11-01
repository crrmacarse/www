import { Module } from '@nestjs/common';
import { AppController, AppService, AppConfigModule } from './app';
import { ResourceModule } from './resources';

@Module({
  imports: [ResourceModule, AppConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }