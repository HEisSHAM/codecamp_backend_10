import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { FoodsService } from './foods.service';
import { FoodsResolver } from './foods.resolver';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { FilesService } from '../files/files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Food, //
      Ingredient,
    ]),
  ],
  providers: [
    FoodsResolver, //
    FoodsService,
    FilesService,
  ],
})
export class FoodsModule {}
