import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor() {}

  @MessagePattern({ qqq: '이름' })
  login(data) {
    //실제 로그인 하기
    console.log(data);
    return 'accessToken!!';
  }
}
