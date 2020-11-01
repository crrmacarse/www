import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorObj = {
            code: status,
            status: exception.name.toLocaleLowerCase(),
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        }
    
        console.error('ERR', errorObj)
    
        response
            .status(status)
            .json(errorObj)
    }
}