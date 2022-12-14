import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.service랑 app.controller는 app.module에 이어짐, 그리고 main.ts를 통해서 파일돌아감
  await app.listen(3000); //express 실행중
}
bootstrap();
