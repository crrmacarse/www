import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOAD_DESTINATION } from 'constants/file';
import { AppConfigModule } from 'app';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
    imports: [
        AppConfigModule,
        MulterModule.register({
            dest: FILE_UPLOAD_DESTINATION,
        })
    ],
    controllers: [UploadController],
    providers: [UploadService],
    exports: [UploadService],
})
export class UploadModule { }