import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';

@Entity()
export class CustomerAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zipcode: string;

  @Column()
  address: string;

  @Column()
  address_detail: string;

  @JoinColumn()
  @OneToOne(() => Customer)
  customer: Customer;
}
