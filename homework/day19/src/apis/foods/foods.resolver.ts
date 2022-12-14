import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { FoodsService } from './foods.service';
import { Food } from './entities/food.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';

@Resolver()
export class FoodsResolver {
  constructor(
    private readonly foodsService: FoodsService, //
  ) {}
  @Query(() => [Food])
  fetchProducts(): Promise<Food[]> {
    return this.foodsService.findAll();
  }

  @Query(() => Food)
  fetchProduct(
    @Args('foodId') foodId: string, //
  ): Promise<Food> {
    return this.foodsService.findOne({ foodId });
  }

  @Mutation(() => Food)
  createFood(
    @Args('createFoodInput') createFoodInput: CreateFoodInput,
  ): Promise<Food> {
    return this.foodsService.create({ createFoodInput });
  }

  @Mutation(() => Food)
  async updateFood(
    @Args('foodId') foodId: string,
    @Args('updateFoodInput') updateFoodInput: UpdateFoodInput,
  ): Promise<Food> {
    const food = await this.foodsService.findOne({ foodId });
    return this.foodsService.update({
      food,
      updateFoodInput,
    });
  }
}
