import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type appConfigEnvType = 'production' | 'development' | 'testing';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
  
  get name(): string {
    return this.configService.get<string>('app.name');
  }

  get env(): appConfigEnvType {
    return this.configService.get<appConfigEnvType>('app.env');
  }
  
  get url(): string {
    return this.configService.get<string>('app.url');
  }
  
  get port(): number {
   return Number(this.configService.get<number>('app.port'));
  }
}