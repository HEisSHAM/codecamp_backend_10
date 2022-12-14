import { Resolver, Query } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}
  @Query(() => String, { nullable: true }) // GraphQL은 대문자로, value 속성 정해줘야됨
  //nullable:true ==> 꼭 필수작성조건아니여도 됨
  fetchBoards() {
    return this.boardsService.qqq(); //return해야 값 나감
  }
}

//실제로 app과 요청받고 return하는 것은 resolver이다.
// API받는곳은 resolver
