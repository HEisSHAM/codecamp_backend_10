import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from '../foods/entities/food.entity';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsService } from './ingredients.service';
import { IngredientsResolver } from './ingredients.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Food, //
      Ingredient,
    ]),
  ],
  providers: [IngredientsService, IngredientsResolver],
})
export class IngredientsModule {}
