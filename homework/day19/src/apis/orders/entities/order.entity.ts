import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { Place } from '../../places/entities/place.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  review_date: Date;

  @Column()
  review_revise_date: Date;

  @Column()
  review_remove_date: Date;

  @JoinColumn()
  @OneToOne(() => Review)
  review: Review;

  @ManyToOne(() => Place)
  place: Place;

  @ManyToOne(() => Customer)
  customer: Customer;
}
