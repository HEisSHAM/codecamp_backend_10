import { CreateFoodInput } from '../foods/dto/create-food.input';
import { Food } from '../foods/entities/food.entity';
import { UpdateFoodInput } from '../foods/dto/update-food.input';

export interface IFoodsServiceFindOne {
  foodId: string;
}

export interface IFoodsServiceCreate {
  createFoodInput: CreateFoodInput;
}

export interface IFoodsServiceUpdate {
  food: Food;
  updateFoodInput: UpdateFoodInput;
}

// export interface IFoodsServiceCheckSoldout {
//   food: Food;
// }
