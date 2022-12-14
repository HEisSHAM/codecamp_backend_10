import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  coffee() {
    const result = [
      {
        menu: '아메리카노',
        price: 5000,
        kcal: 10,
        fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 100,
      },
      {
        menu: '피치레몬블렌디드',
        price: 7000,
        kcal: 100,
        fat: 30,
        protein: 5,
        salt: 5,
        sugar: 100,
        caffeine: 0,
      },
      {
        menu: '자바칩프라푸치노',
        price: 9000,
        kcal: 500,
        fat: 0,
        protein: 10,
        salt: 90,
        sugar: 400,
        caffeine: 0,
      },
      {
        menu: '민트초코아이스',
        price: 8000,
        kcal: 10,
        fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 0,
      },
      {
        menu: '자몽에이드',
        price: 9000,
        kcal: 190,
        fat: 50,
        protein: 0,
        salt: 10,
        sugar: 150,
        caffeine: 0,
      },
    ];
    return result;
  }
}
