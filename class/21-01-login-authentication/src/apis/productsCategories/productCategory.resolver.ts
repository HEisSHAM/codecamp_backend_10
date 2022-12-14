import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsCategoriesService } from './productCategory.service';
import { ProductCategory } from './entities/productCategory.entity';

@Resolver()
export class ProductsCategoriesResolver {
  constructor(
    private readonly productCategoriesService: ProductsCategoriesService,
  ) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('name') name: string, //
  ): Promise<ProductCategory> {
    //브라우저에 결과 보내는 2가지 방법

    //1. 저장된 객체 그대로 보내기 => 프론트엔드 개발자분이 브라우저에 임시저장 해놓을 수 있음 (캐싱)
    return this.productCategoriesService.create({ name });

    // 2. 결과 메세지만 보내주기
    // return '정상적으로 카테고리가 등록되었습니다'
  }
}
