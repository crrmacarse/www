import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { loggerMiddleware } from 'middleware/logger.middleware';
import { HttpExceptionFilter } from 'exception/http-exception.filter'
import { ValidationPipe } from 'pipes/validation.pipe';
import { RolesGuard } from 'guards/roles.guard'

const PORT = process.env.PORT || 1111;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** Enable CORS */
  app.enableCors();

  /** Brunte force protection */
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  /**
   * Secures http security related risk
   */
  app.use(helmet());

  /**
   * Apply gzip compression
   */
  app.use(compression())

  /**
   * Apply custom filter
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  /**
   * Simple logging middleware
   */
  app.use(loggerMiddleware);

  /**
   * Inject validation
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Role Proection
   */
  app.useGlobalGuards(new RolesGuard(new Reflector()));

  await app.listen(PORT);
}
bootstrap();
