import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigService } from 'app';

@Injectable()
export class DatabaseConfigService {
    constructor(
        private configService: ConfigService,
        private appConfigService: AppConfigService
       ) {}
 
    get host(): string {
        return this.configService.get<string>('database.host');
    }

    get port(): number {
        return this.configService.get<number>('database.port');
    }

    get username(): string {
        return this.configService.get<string>('database.username');
    }

    get password(): string {
        return this.configService.get<string>('database.password');
    }

    get name(): string {
        return this.configService.get<string>('database.name');
    }

    get getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            keepConnectionAlive: true,
            host: this.host,
            port: this.port,
            database: this.name,
            username: this.username,
            password: this.password,
            autoLoadEntities: true,
            logging: this.appConfigService.env !== 'production',
            // synchronize: true,
        };
    }
}