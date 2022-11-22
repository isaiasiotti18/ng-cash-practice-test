import { HttpExceptionFilter } from './shared/errors/execptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: ['get', 'post', 'put', 'delete', 'patch'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
    bodyParser: true,
  });

  const config = new DocumentBuilder()
    .setTitle('NG CASH PRACTICE TEST')
    .setDescription('The NG CASH PRACTICE TEST API description')
    .setVersion('1.0')
    .addTag('NG_CASH_PRACTICE_TEST')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(3000);
}
bootstrap();
