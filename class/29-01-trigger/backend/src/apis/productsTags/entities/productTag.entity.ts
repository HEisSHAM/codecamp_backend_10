import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Product])
  @ManyToMany(() => Product, (products) => products.productTags)
  products: Product[];
}
