import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } from 'constants/default';
import { loggerMiddleware } from 'middleware/logger.middleware';;
import { HttpExceptionFilter } from 'exception/http-exception.filter';
import { TimeoutInterceptor } from 'interceptors/timeout.interceptor';
import { AppModule } from './app.module';
import { AppConfigService } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Get app configurations
   */
  const appConfig: AppConfigService = app.get('AppConfigService');

  /** Enable CORS */
  app.enableCors();

  /** Brunte force protection */
  app.use(
    rateLimit({
      windowMs: RATE_LIMIT_WINDOW_MS, // 15 minutes
      max: RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
    }),
  );

  /**
   * Secures http security related risk
   */
  app.use(helmet());

  /**
   * Apply gzip compression
   */
  app.use(compression());

  /**
   * Apply custom filter
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  /**
   * Simple logging middleware
   */
  if (appConfig.env === 'production') {
    app.use(loggerMiddleware);
  }

  /**
   * Inject validation
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Global Interceptors
   */
  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(appConfig.port);
}
bootstrap();
