import {
  EventSubscriber,
  DataSource,
  InsertEvent,
  EntitySubscriberInterface,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this); // 나 자신을 명단에 등록
  }

  listenTo() {
    return Product;
  }

  //내가 insert한 객체가 들어옴
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    console.log(event); // event.entity.price, event.entity.isSoldout 등등

    const id = event.entity.id;
    const name = event.entity.name;
    const description = event.entity.description;
    const price = event.entity.price;
    const isSoldout = event.entity.isSoldout;

    console.log(`${id} ${name} ${description} ${price}, ${isSoldout}`); // 빅쿼리(GCP)나 엘라스틱서치(로그 담아주는곳)에 로그 담기

    // 1. 트리거는 언제 사용하면 안될까?
    // 트랜잭션 등 중요한 내용에 트리거를 달아놓으면 문제가 생길 수 있음.

    // 2. 어떤 것들을 사용하면 좋을까?
    // 트리거는 메인 로직에 큰 피해를 끼치지 않는 것들에 사용해야 한다 (통계 계산 / 로그 쌓기)
    // 주로 합계, 평균, 시간별 통계 등 Summary를 트리거로 따로 담아줌
  }
}
