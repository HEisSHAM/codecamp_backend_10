import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { Payment } from '../../payments/entities/payment.entity';

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

  @JoinColumn()
  @OneToOne(() => Payment)
  payment: Payment;
}
