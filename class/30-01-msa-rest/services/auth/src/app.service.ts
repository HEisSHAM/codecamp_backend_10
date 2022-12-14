import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  aaa(): string {
    return 'Hello World!';
  }
}

//scope: Scope.REQUEST(요청마다 NEW)) / DEFAULT(모든API에서 1번, 싱글톤) / TRANSIENT(주입받을때마다 새로운 NEW)
