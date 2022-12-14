//prettier-ignore
import {Column,Entity,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToOne,PrimaryGeneratedColumn,} from 'typeorm';
import { ProductCategory } from '../../productsCategories/entities/productCategory.entity';
import { User } from '../../users/entities/user.entity';
import { ProductSaleslocation } from '../../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../../productsTags/entities/productTag.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Boolean)
  @Column({ default: false })
  isSoldout: boolean;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn()
  @Field(() => ProductSaleslocation)
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag]) //graphQL에서는 양쪽으로 감싸기
  productTags: ProductTag[];
}
