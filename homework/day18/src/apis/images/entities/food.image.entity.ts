import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from '../../foods/entities/food.entity';

@Entity()
export class FoodImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  is_main: boolean;

  @ManyToOne(() => Food)
  food: Food;
}
