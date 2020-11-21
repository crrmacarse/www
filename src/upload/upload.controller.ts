import {
    Controller, Get, Post,
    UploadedFile, UploadedFiles,
    UseInterceptors, Param, Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FILE_UPLOAD_DESTINATION, FILE_UPLOAD_LIMITATIONS } from 'constants/file';
import { formatFileName } from 'utils/file';
import { UploadService } from './upload.service';
import { UploadFileDto, UploadFilesDto } from './upload.dto';

@Controller()
@ApiTags('general')
export class UploadController {
    constructor(private uploadService: UploadService) {}

    @Get('uploads/:imgPath')
    getUploadedFile(@Param('imgPath') imgPath, @Res() res) {
        return res.sendFile(imgPath, { root: FILE_UPLOAD_DESTINATION });
    }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload a single file[MAX: 4mb, Accepts: jpg|jpeg|png|gif|pdf|docx]',
        type: UploadFileDto,
    })
    @UseInterceptors(FileInterceptor('file', {
        limits: FILE_UPLOAD_LIMITATIONS,
        storage: diskStorage({
            destination: FILE_UPLOAD_DESTINATION,
            filename: formatFileName,
        })
    }))
    async uploadFile(@UploadedFile() file) {
        this.uploadService.validateFile(file);

        return {
            message: 'Succesfully uploaded a file',
            file: this.uploadService.formatName(file.filename),
            timestamp: new Date().toISOString(),
        };
    }

    @Post('upload-files')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload a multiple files[MAX: 4mb, Accepts: jpg|jpeg|png|gif|pdf|docx]',
        type: UploadFilesDto,
    })
    @UseInterceptors(FilesInterceptor('files', undefined, {
        limits: FILE_UPLOAD_LIMITATIONS,
        storage: diskStorage({
            destination: FILE_UPLOAD_DESTINATION,
            filename: formatFileName,
        })
    }))
    async uploadFiles(@UploadedFiles() files) {
        files.forEach((f) => {
            this.uploadService.validateFile(f);
        });

        return {
            message: 'Succesfully uploaded a file',
            files: files.map((f) => this.uploadService.formatName(f.filename)),
            timestamp: new Date().toISOString(),
        };
    }
}
