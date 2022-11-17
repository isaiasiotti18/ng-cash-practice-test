import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

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

  await app.listen(3000);
}
bootstrap();
