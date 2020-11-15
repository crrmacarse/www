import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from './database.config.module';
import { DatabaseConfigService } from './database.config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [DatabaseConfigModule],
            useFactory: async (dbConfigService: DatabaseConfigService) => dbConfigService.getTypeOrmConfig,
            inject: [DatabaseConfigService]
        })
    ],
})
export class DatabaseModule { }