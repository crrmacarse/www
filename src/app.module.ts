import { Module } from '@nestjs/common';
import { AppController, AppService } from './app';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/http-exception.filter'
import { ResourceModule } from './resources';

@Module({
  imports: [ResourceModule],
  controllers: [AppController, ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService],
})
export class AppModule {}