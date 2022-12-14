import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Food } from '../../foods/entities/food.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  ordered_menu: string;

  @Column()
  contents: string;

  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => Food)
  food: Food;
}
