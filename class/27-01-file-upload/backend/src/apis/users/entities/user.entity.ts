import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field(() => Int)
  @Column({ default: 0 })
  point: number;
}
