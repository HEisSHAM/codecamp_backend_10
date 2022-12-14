import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // name: string;
  // description : string;
  // price: number:
}

// PickType --> [name] 이런식으로 고르기
// OmitType 이거만 뽑아내기
// PartialType 있어도되고 없어도 되도록 바꾸기
