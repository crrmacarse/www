import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { REQUEST_TIME_OUT } from 'constants/default';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(REQUEST_TIME_OUT),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    return throwError(new RequestTimeoutException());
                }
                
                return throwError(err);
            }),
        );
    };
};