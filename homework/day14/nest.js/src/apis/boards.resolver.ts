import { Resolver, Query } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Type } from './interface';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}
  @Query(() => [Type])
  fetchStarbucks() {
    return this.boardsService.coffee(); //
  }
}
