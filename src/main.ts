import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
    new DefaultValuePipe(null),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
