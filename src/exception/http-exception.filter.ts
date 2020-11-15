import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const isInstanceOfHttpException = exception instanceof HttpException;
       
        const status =
        isInstanceOfHttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = exception.message;

        if(isInstanceOfHttpException) {
            const { message: msg } = exception.getResponse() as any;

            message = msg;
        }

        const errorObj = {
            code: status,
            status: 'error',
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        response
            .status(status)
            .json(errorObj);
    }
}