import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from '../interfaces/IProductsServiceCreate';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find(); //find 하는 순간 DB에 접속
  }
  //product repository 는 typeorm에 내장되어있는 기능 사용하는 것, DB
  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,
      //하나하나 직접 나열하는 방식
      //   name: createProductInput.name,
      //   description: createProductInput.description,
      //   price: createProductInput.price,
    }); // 저장하고 싶은 값 result에 담아서 return
    return result;
    // result = {id, name, description, price 담긴 객체}
  }

  update({
    product,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // this.productsRepository.insert() -- 결과를 객체로 못돌려받는 수정 방법
    // this.productsRepository.update()  -- 결과를 객체로 못돌려받는 수정 방법
    // this.productsRepository.create() - DB랑 관련없음 등록을 위해 빈 껍데기 객체 만들기 위함

    const result = this.productsRepository.save({
      // id가 있으면 수정, 없으면 새로 저장!!!!
      ...product, // 수정 후 수정되지 않은 다른 결과값도 받고싶을때
      ...updateProductInput,
    });
    return result;
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
      throw new UnprocessableEntityException('이미판매된상품');
  }
}
