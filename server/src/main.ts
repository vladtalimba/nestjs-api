import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cors.
  app.enableCors();

  // Use a validation pipe to globally access the validators.
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
