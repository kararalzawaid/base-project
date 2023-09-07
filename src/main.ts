import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';

import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import Redis from 'ioredis';


import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { GlobalExceptionFilter } from '@common/filters/global.filter';

async function bootstrap() {
  const appOptions = process.env.NODE_ENV === 'dev'
    ? { httpsOptions: { key: fs.readFileSync('./cert/dev.pem'), cert: fs.readFileSync('./cert/dev.crt') } }
    : {};

  const app = await NestFactory.create(AppModule, appOptions);

  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false
      },
      exceptionFactory: (errors: ValidationError[] = []) =>
        new BadRequestException(errors)
    })
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  const RedisStore = connectRedis(session);
  const redisClient = new Redis({ port: parseInt(process.env.REDIS_PORT), host: process.env.REDIS_HOST });

  app.use(
    session({
      store: new RedisStore({ client: redisClient, logErrors: true }),
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'dev',
        httpOnly: true,
        sameSite: 'lax',
        domain: process.env.DOMAIN
      }
    })
  );

  const options = new DocumentBuilder()
    .setTitle('basic Service')
    .setDescription('basic services')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.SERVER_PORT || 4000;
  console.log(`App is running on port ${port}`);

  await app.listen(port);
  await app.startAllMicroservices();
}

bootstrap();