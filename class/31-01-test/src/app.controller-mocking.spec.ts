import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

class MockAppService {
  getHello(): string {
    return '나는 가짜다!';
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService, //원래 들어갈 자리
          useClass: MockAppService, //그 자리에 이걸 사용해줘
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 결과는 Hello World를 리턴해야함!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
