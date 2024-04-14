import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: false,
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
