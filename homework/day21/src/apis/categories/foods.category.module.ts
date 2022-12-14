import { Module } from '@nestjs/common';
import { FoodCategory } from './entities/food.category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsCategoryService } from './foods.category.service';
import { FoodsCategoryResolver } from './foods.category.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FoodCategory, //
    ]),
  ],
  providers: [
    FoodsCategoryResolver, //
    FoodsCategoryService,
  ],
})
export class FoodsCategoryModule {}
