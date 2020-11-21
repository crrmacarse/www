import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

/**
 * Destination of file uploads
 * 
 * multer checks for project root.
 */
export const FILE_UPLOAD_DESTINATION = './public/uploads';

export const FILE_UPLOAD_LIMITATIONS: MulterOptions['limits'] = {
    fileSize: 1048576 * 4,
};

export const FILE_UPLOAD_ACCEPTED_FORMAT = /\.(jpg|jpeg|png|gif|pdf|docx)$/;
