import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Food } from '../../foods/entities/food.entity';

@ObjectType()
@Entity()
export class Ingredient {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(() => Food, (Food) => Food.id)
  @Field(() => [Food])
  food: Food[];
}
