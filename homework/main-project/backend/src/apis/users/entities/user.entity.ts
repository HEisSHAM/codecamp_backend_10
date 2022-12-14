import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column()
  email: string;

  // @Field(() => String)
  @Column()
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field(() => String)
  nickname: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @Column()
  @Field(() => String)
  imageURL: string;
}
