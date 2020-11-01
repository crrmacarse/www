import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * UNUSED
 * 
 * This is useful for testing process time of a route
 * 
 * USAGE:
 * 
 * @UseInterceptors(LoggingInterceptor) <-- append on top of a controller
 * export class ExampleController {}
 * 
 * reference: https://docs.nestjs.com/interceptors
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => console.log(`Execution time: ${Date.now() - now}ms`)),
      );
  }
}