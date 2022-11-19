import { HttpExceptionFilter } from './shared/errors/execptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/errors/execptions/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
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

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
