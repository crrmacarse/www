import { Module } from '@nestjs/common';
import { AppController, AppService, AppConfigModule } from './app';
import { DatabaseModule } from './database';
import { ResourceModule } from './resources';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, ResourceModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }