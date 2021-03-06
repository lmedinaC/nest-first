import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryFailedErrorException } from './handler-exceptions/query-failed-error-exception.filter';
import { TransformInterceptor } from './Transform.interceptor';
import {Logger} from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
  logger.log("App listening on port 3000");
}
bootstrap();
