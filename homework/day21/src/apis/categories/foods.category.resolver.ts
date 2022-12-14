import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FoodsCategoryService } from './foods.category.service';
import { FoodCategory } from './entities/food.category.entity';

@Resolver()
export class FoodsCategoryResolver {
  constructor(private readonly foodsCategoryService: FoodsCategoryService) {}

  @Mutation(() => FoodCategory)
  createFoodCategory(
    @Args('category')
    category: string,
  ): Promise<FoodCategory> {
    return this.foodsCategoryService.create({ category });
  }
}
