import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import {
  IFoodsServiceCreate,
  IFoodsServiceDelete,
  IFoodsServiceFindOne,
  IFoodsServiceRestore,
  // IFoodsServiceUpdate,
} from '../interfaces/IFoodsService';
import { Ingredient } from '../ingredients/entities/ingredient.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private readonly foodsRepository: Repository<Food>,

    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  //////find all//////
  findAll(): Promise<Food[]> {
    return this.foodsRepository.find({
      withDeleted: true,
    });
  }

  //////find one//////
  findOne({ foodId }: IFoodsServiceFindOne): Promise<Food> {
    return this.foodsRepository.findOne({ where: { id: foodId } });
  }

  //////create//////
  async create({ createFoodInput }: IFoodsServiceCreate): Promise<Food> {
    const { category, ingredient, ...food } = createFoodInput;

    const temp = [];
    for (let i = 0; i < ingredient.length; i++) {
      const ingredientName = ingredient[i];

      const preIngredient = await this.ingredientRepository.findOne({
        where: { name: ingredientName },
      });

      if (preIngredient) {
        temp.push(preIngredient);
      } else {
        const newIngredient = await this.ingredientRepository.save({
          name: ingredientName,
        });
        temp.push(newIngredient);
      }
    }

    const result = await this.foodsRepository.save({
      ...food,
      foodCategory: {
        id: category,
      },
      Ingredient: temp,
    });
    return result;
  }

  // ////update//////
  // update({ food, updateFoodInput }: IFoodsServiceUpdate): Promise<Food> {
  //   const result = this.foodsRepository.save({
  //     ...food,
  //     ...updateFoodInput,
  //   });
  //   return result;
  // }

  //////delete//////
  async delete({ foodId }: IFoodsServiceDelete): Promise<boolean> {
    const result = await this.foodsRepository.softDelete({ id: foodId });
    return result.affected ? true : false;
  }

  //restore/////////////////////////////
  async restore({ foodId }: IFoodsServiceRestore): Promise<boolean> {
    const result = await this.foodsRepository.restore({ id: foodId });
    return result.affected ? true : false;
  }
}
