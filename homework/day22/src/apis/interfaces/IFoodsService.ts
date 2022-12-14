import { CreateFoodInput } from '../foods/dto/create-food.input';
import { Food } from '../foods/entities/food.entity';
import { UpdateFoodInput } from '../foods/dto/update-food.input';
import { User } from '../users/entities/user.entity';
import { UpdateUserInput } from '../users/dto/update.user.input';

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

export interface IFoodsServiceDelete {
  foodId: string;
}

export interface IFoodsServiceRestore {
  foodId: string;
}

export interface IFoodsCategoryCreate {
  category: string;
}

export interface IUsersServiceCreate {
  email: string;
  name: string;
  hashedPassword: string;
  age: number;
  nickname: string;
}

export interface IUsersServiceFindOne {
  email: string;
}

export interface IUsersServiceUpdate {
  user: User;
  updateUserInput: UpdateUserInput;
}

export interface IUsersServiceDelete {
  userId: string;
}
