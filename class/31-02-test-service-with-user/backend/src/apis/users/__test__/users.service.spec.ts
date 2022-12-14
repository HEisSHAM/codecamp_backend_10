import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';

// 나만의 미니 TypeORM 만들기(mocking)
class MockUsersRepository {
  mydb = [
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 },
    { email: 'qqq@qqq.com', password: '1234', name: '철수', age: 12 },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModule = await Test.createTestingModule({
      providers: [
        UsersService, //repository가 주입된 UsersService
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
  });

  //    이렇게하면 진짜 DB 찾아가서 비교함
  //   describe('findOne', () => {
  //     const result = usersService.findOne({ email: 'a@a.com' });
  //     expect(result).toStrictEqual({ //객체 비교는 스트링으로 하거나 Strict로
  //         email: 'a@a.com',
  //         name: "짱구",
  //         ...
  //     })
  //   });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };
      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        // instance = ()의 복제본인지 여부
        // test를 잘 만들었는지 확인하려면 일부러 error 유도
      }
    }); //중복으로 이메일 기재해서 에러만들기

    it('회원 등록 잘 됐는지 검증!!', async () => {
      const myData = {
        email: 'bbb@bbb.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };
      const result = await usersService.create({ ...myData });
      expect(result).toStrictEqual({
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      });
    });
  });
});
