import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  point: number;

  @Column()
  nickname: string;

  @Column()
  pwd: string;

  @Column()
  email: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  removed_at: Date;

  @Column()
  balance: number;
}
