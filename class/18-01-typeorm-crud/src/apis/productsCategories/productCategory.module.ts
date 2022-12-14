import { Module } from '@nestjs/common';
import { ProductsCategoriesResolver } from './productCategory.resolver';
import { ProductsCategoriesService } from './productCategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory, //
    ]),
  ],

  providers: [ProductsCategoriesResolver, ProductsCategoriesService],
})
export class ProductsCategoriesModule {}
