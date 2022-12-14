import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { FoodsService } from './foods.service';
import { Food } from './entities/food.entity';
import { CreateFoodInput } from './dto/create-food.input';

@Resolver()
export class FoodsResolver {
  constructor(
    private readonly foodsService: FoodsService, //
  ) {}
  //Find all//
  @Query(() => [Food])
  fetchProducts(): Promise<Food[]> {
    return this.foodsService.findAll();
  }

  //Find one//
  @Query(() => Food)
  fetchProduct(
    @Args('foodId') foodId: string, //
  ): Promise<Food> {
    return this.foodsService.findOne({ foodId });
  }

  //Create//
  @Mutation(() => Food)
  createFood(
    @Args('createFoodInput') createFoodInput: CreateFoodInput,
  ): Promise<Food> {
    return this.foodsService.create({ createFoodInput });
  }

  //Update//
  // @Mutation(() => Food)
  // async updateFood(
  //   @Args('foodId') foodId: string,
  //   @Args('updateFoodInput') updateFoodInput: UpdateFoodInput,
  // ): Promise<Food> {
  //   const food = await this.foodsService.findOne({ foodId });
  //   return this.foodsService.update({
  //     food,
  //     updateFoodInput,
  //   });
  // }

  //Delete//
  @Mutation(() => Boolean)
  deleteFood(
    @Args('foodId') foodId: string, //
  ): Promise<boolean> {
    return this.foodsService.delete({ foodId });
  }

  //Restore//
  @Mutation(() => Boolean)
  restoreFood(
    @Args('foodId') foodId: string, //
  ): Promise<boolean> {
    return this.foodsService.restore({ foodId });
  }
}
