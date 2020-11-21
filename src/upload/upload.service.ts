import { Injectable, BadRequestException } from '@nestjs/common';
import { AppConfigService } from 'app';
import { FILE_UPLOAD_ACCEPTED_FORMAT } from 'constants/file';

@Injectable()
export class UploadService {
    constructor(
        private appConfigService: AppConfigService
    ) {}

    formatName(fileName: string) {
        return `${this.appConfigService.url}/uploads/${fileName}`;
    }

    validateFile(file) {
        if (!file) {
            throw new BadRequestException('No file is found');
        }

        if (!file.originalname.match(FILE_UPLOAD_ACCEPTED_FORMAT)) {
            throw new BadRequestException('Invalid File');
        }
    }
}
