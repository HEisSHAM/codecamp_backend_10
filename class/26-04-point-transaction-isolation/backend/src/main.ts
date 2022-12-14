import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.service랑 app.controller는 app.module에 이어짐, 그리고 main.ts를 통해서 파일돌아감
  await app.listen(3000); //express 실행중
  app.useGlobalFilters(new HttpExceptionFilter()); // 모든 api에 붙이는 기능
}
bootstrap();
