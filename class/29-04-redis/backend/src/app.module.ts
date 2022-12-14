import { CacheModule, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardsModule } from './apis/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsCategoriesModule } from './apis/productsCategories/productCategory.module';
import { ProductsModule } from './apis/products/products.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { JwtAccessStrategy } from './commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from './commons/auth/jwt-refresh.strategy';
import { PointsTransactionsModule } from './apis/pointsTransactions/pointsTransactions.module';
import { FilesModule } from './apis/files/files.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    FilesModule,
    PointsTransactionsModule,
    ProductsModule,
    ProductsCategoriesModule,
    UsersModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql', //스키마 자동으로만들어 줄 위치
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      // socketPath: '/tmp/mysql.sock',
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
  ],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class AppModule {}

//AppModule만 실행되니깐 꼭 여기서 합쳐라
