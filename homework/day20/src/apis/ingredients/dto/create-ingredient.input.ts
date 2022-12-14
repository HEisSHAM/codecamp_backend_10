import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateIngredientInput {
  @Field(() => String)
  name: string;
}
