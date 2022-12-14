import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFoodInput } from './create-food.input';

@InputType()
export class UpdateFoodInput extends PartialType(CreateFoodInput) {}
