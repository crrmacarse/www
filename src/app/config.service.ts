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

  get key(): string {
    return this.configService.get<string>('app.key');
  }

  get refreshKey(): string {
    return this.configService.get<string>('app.refreshKey');
  }

  get debug(): boolean {
    return Boolean(this.configService.get<boolean>('app.debug'));
  }
}