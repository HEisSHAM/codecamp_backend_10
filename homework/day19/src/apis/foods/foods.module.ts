import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { FoodsService } from './foods.service';
import { FoodsResolver } from './foods.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Food, //
    ]),
  ],
  providers: [
    FoodsResolver, //
    FoodsService,
  ],
})
export class FoodsModule {}
