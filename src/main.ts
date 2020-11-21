import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } from 'constants/default';
import { loggerMiddleware } from 'middleware/logger.middleware';;
import { HttpExceptionFilter } from 'exception/http-exception.filter';
import { TimeoutInterceptor } from 'interceptors/timeout.interceptor';
import { AppConfigService } from 'app';
import { MainModule } from './main.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    logger: true,
  });

  /**
   * Get app configurations
   */
  const appConfig: AppConfigService = app.get('AppConfigService');

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Personal API Server')
    .setDescription('https://github.com/crrmacarse')
    .setVersion(`v${process.env.npm_package_version}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey,
  });

  /**
   * Load swagger in /docs route
   */
  SwaggerModule.setup('docs', app, document);

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

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
