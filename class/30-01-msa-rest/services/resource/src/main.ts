import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: 'resource-service', port: 3001 }, // 게이트 웨이와 똑같이 입력
    },
  );
  await app.listen();
}

bootstrap();
