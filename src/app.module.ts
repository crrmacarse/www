import { Module } from '@nestjs/common';
import { AppController, AppService, AppConfigModule } from './app';
import { DatabaseModule } from './database';
import { ResourceModule } from './resources';

@Module({
  imports: [AppConfigModule, DatabaseModule, ResourceModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }