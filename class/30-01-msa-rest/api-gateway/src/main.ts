import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); //express 실행중
}
bootstrap();

//모든 API는 게이트웨이에서 받음 ==> 연결 필요
