import {
  Column,
  DeleteDateColumn,
  Entity,
  // JoinTable,
  // ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FoodCategory } from '../../categories/entities/food.category.entity';
// import { Ingredient } from '../../ingredients/entities/ingredient.entity';

import { Field, ObjectType, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Food {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => String)
  @Column()
  description: string;

  @ManyToOne(() => FoodCategory)
  @Field(() => FoodCategory)
  foodCategory: FoodCategory;

  // @JoinTable()
  // @ManyToMany(() => Ingredient, (Ingredient) => Ingredient.id)
  // @Field(() => [Ingredient])
  // ingredient: Ingredient[];

  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => String)
  @Column()
  imageURL: string;
}
