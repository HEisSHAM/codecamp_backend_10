import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import {
  IFoodsServiceCreate,
  IFoodsServiceFindOne,
  IFoodsServiceUpdate,
} from '../interfaces/IFoodsService';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private readonly foodsRepository: Repository<Food>,
  ) {}
  //find all//
  findAll(): Promise<Food[]> {
    return this.foodsRepository.find();
  }
  // find one//
  findOne({ foodId }: IFoodsServiceFindOne): Promise<Food> {
    return this.foodsRepository.findOne({ where: { id: foodId } });
  }

  //create//
  create({ createFoodInput }: IFoodsServiceCreate): Promise<Food> {
    const result = this.foodsRepository.save({
      ...createFoodInput,
    });
    return result;
  }
  //update//
  update({ food, updateFoodInput }: IFoodsServiceUpdate): Promise<Food> {
    const result = this.foodsRepository.save({
      ...food,
      ...updateFoodInput,
    });
    return result;
  }
}
