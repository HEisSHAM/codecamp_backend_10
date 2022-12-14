import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from '../../foods/entities/food.entity';

@ObjectType()
@Entity()
export class FoodImage {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  url: string;

  @Field(() => String)
  @Column({ default: true })
  is_main: boolean;

  // @Field(() => Food)
  // @Column()
  // @ManyToOne(() => Food)
  // food: Food;
}
