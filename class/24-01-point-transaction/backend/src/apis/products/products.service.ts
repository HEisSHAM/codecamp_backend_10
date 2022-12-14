import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
  IProductServiceDelete,
} from './interfaces/IProductsServiceCreate';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //

    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationsRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductTag)
    private readonly producesTagsRepository: Repository<ProductTag>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find(); //find 하는 순간 DB에 접속
  }
  //product repository 는 typeorm에 내장되어있는 기능 사용하는 것, DB
  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 1. 상품만 등록하는 경우
    // const result = this.productsRepository.save({
    //   ...createProductInput,

    //   //하나하나 직접 나열하는 방식
    //   //   name: createProductInput.name,
    //   //   description: createProductInput.description,
    //   //   price: createProductInput.price,
    // }); 저장하고 싶은 값 result에 담아서 return

    // 2. 상품과 상품 거래위치를 같이 등록하는 경우 (나머지 연산자로 나눔)
    const { productSaleslocation, productCategoryId, productTags, ...Product } =
      createProductInput;

    //2-1 상품 거래위치 등록
    const result = await this.productsSaleslocationsRepository.save({
      ...productSaleslocation, //1. 스프레드 연산자로 한번에 등록
      // 2. 하나하나 직접 입력하는 방식
      // address: productSaleslocation.address,
      // addressDetail: productSaleslocation.addressDetail,
    });

    // 2-2 상품 태그 등록
    //    => 상품태그 예시? productTags =  ["#전자제품", "#영등포", "#컴퓨터"]
    const temp = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', ''); // "전자제품"
      //newTag = {id: sdokapsokdop, name: 전자제품}

      const prevTag = await this.producesTagsRepository.findOne({
        where: { name: tagname },
      });
      // 기존에 태그가 존재한다면~
      if (prevTag) {
        temp.push(prevTag); // id: ~~~~ + name:"전자제품",
      } else {
        // 기존에 태그가 없었다면 (신규)
        const newTag = await this.producesTagsRepository.save({
          name: tagname,
        });
        temp.push(newTag); // id: ~~~~ + name:"전자제품", id:!@#!@# + name: "영등포"
      }
    }

    // 1. 실무에서 반드시 필요한 경우가 아니면 for문 잘 안씀 => map, forEach 사용
    // 2. for안에서 await 사용하지 않음 ==> 안티패턴 => promise.all 사용
    // 3. DB에 동일한 패턴 데이터를 반복적으로 등록하지 않음 (네트워크 왔다갔다 비효율) => bulk-insert사용

    // 2-3 상품 등록 (따로 등록한 것 모두 합쳐서)
    const result2 = await this.productsRepository.save({
      ...Product,
      productSaleslocation: result,
      productCategory: {
        id: productCategoryId,
        // 만약 name 까지 받고 싶으면 2가지 방법?
        // 1) createProductInput에서 카테고리 name도 받아오기
        // 2) productCategoryId를 사용해서 카테고리 name을 조회하기
      },
      productTags: temp,

      // result를 통째로 넣기 vs 아이디만 넣기

      //id만 넣으면 나머지 값을 못돌려받음
      // //하나하나 직접 입력하는 방식
      // name: Product.name,
      // description: Product.description,
      // price: Product.price,
      // ProductSaleslocation: {
      //   id: result.id,
      // },
    });

    //최종 결과 돌려주기 (location 먼저 받아오고-> product에 다시 넣어서 return)
    return result2;
    // result = {id, name, description, price 담긴 객체}
  }

  update({ product, updateProductInput }: IProductsServiceUpdate): void {
    // this.productsRepository.insert() -- 결과를 객체로 못돌려받는 수정 방법
    // this.productsRepository.update()  -- 결과를 객체로 못돌려받는 수정 방법
    // this.productsRepository.create() - DB랑 관련없음 등록을 위해 빈 껍데기 객체 만들기 위함
    //
    //숙제: 아래 에러 고쳐보기(tag가 추가됨) ************************
    // const result = this.productsRepository.save({
    //   // id가 있으면 수정, 없으면 새로 저장!!!!
    //   ...product, // 수정 후 수정되지 않은 다른 결과값도 받고싶을때
    //   ...updateProductInput,
    // });
    // return result;
  }

  //검증하기
  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    // if (Product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }

    //void = 리턴값 없는 타입

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매된 상품');
  }

  async delete({ productId }: IProductServiceDelete): Promise<boolean> {
    //1. 실제로 삭제할때
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    //2.소프트 삭제(직접구현) - isDeleted 사실상 수정
    // this.productsRepository.update({ id: productId }, { isDeleted: true });
    //왼쪽 값을 오른쪽으로 바꿔줘

    // 3. 소프트 삭제(직접구현) - deletedAt
    // this.productsRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },);

    //4. 소프트 삭제 (TypeORM 제공) - softRemove - id로만 삭제 가능
    // this.productsRepository.softRemove({ id: productId });

    //5. 소프트 삭제 (TypeORM 제공) - softDelete - 다른 조건으로도 삭제 가능
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
