import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardsModule } from './apis/boards/boards.module';

@Module({
  imports: [
    BoardsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql', //스키마 자동으로만들어 줄 위치
    }),
  ],
})
export class AppModule {}

//AppModule만 실행되니깐 꼭 여기서 합쳐라
