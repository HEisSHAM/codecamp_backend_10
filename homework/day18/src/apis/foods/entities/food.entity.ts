import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { FoodCategory } from '../../categories/entities/food.category.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { Place } from '../../places/entities/place.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => Place)
  place: Place;

  @JoinColumn()
  @OneToOne(() => Order)
  order: Order;

  @ManyToOne(() => FoodCategory)
  foodcategory: FoodCategory;

  @JoinTable()
  @ManyToMany(() => Ingredient, (Ingredient) => Ingredient.ingredient)
  ingredient: Ingredient;
}
