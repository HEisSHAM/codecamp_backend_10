import { OmitType, InputType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}
