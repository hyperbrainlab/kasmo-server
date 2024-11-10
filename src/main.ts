import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { TransformInterceptor } from 'src/modules/common/interceptor/transform';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { AppModule } from './app.module';

import * as express from 'express';
import { join } from 'path';

const PORT = 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Kasmo APIs')
    .setDescription('Kasmo APIs description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  };

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors(corsOptions);

  app.use('/banners', express.static(join(__dirname, '..', 'uploads/banners')));

  await app.listen(PORT);
}
bootstrap();
