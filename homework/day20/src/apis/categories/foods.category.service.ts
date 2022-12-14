import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFoodsCategoryCreate } from '../interfaces/IFoodsService';
import { FoodCategory } from './entities/food.category.entity';

@Injectable()
export class FoodsCategoryService {
  constructor(
    @InjectRepository(FoodCategory)
    private readonly foodsCategoryRepository: Repository<FoodCategory>,
  ) {}

  create({ category }: IFoodsCategoryCreate): Promise<FoodCategory> {
    const result = this.foodsCategoryRepository.save({
      category,
    });
    return result;
  }
}
