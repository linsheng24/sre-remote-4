import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    name: 'CACHE_SERVICE',
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_URL,
      port: 6379,
    },
  });

  const config = new DocumentBuilder()
    .setTitle('SRE Remote 4 Doc')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
