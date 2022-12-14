import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  impuid: number;

  @Column()
  method: string;

  @Column()
  amount: number;

  @Column()
  is_refund: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Customer)
  customer: Customer;
}
