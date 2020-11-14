import { Module, CacheModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        CacheModule.register(),
        ScheduleModule.forRoot(),
    ],
})
export class FeatureModule { }