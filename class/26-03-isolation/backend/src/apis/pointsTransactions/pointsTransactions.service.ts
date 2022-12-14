import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/point-transaction-service.interface';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<any> {
    // this.pointsTransactionsRepository.create(), //등록을 위한 빈 객체 생성 DB로 안감
    // this.pointsTransactionsRepository.insert(), // 결과는 못받는 등록
    // this.pointsTransactionsRepository.update(), // 결과는 못받는 수정

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect(); // DB접속, promise 필수

    await queryRunner.startTransaction(); // Transaction 시작

    try {
      // 1. PointTransaction 테이블에 거래 기록 1줄 생성
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      // await this.pointsTransactionsRepository.save(pointTransaction);
      // 원래 save 로직
      await queryRunner.manager.save(pointTransaction);
      // throw new Error('강제 에러 발생');
      //쿼리 러너를 통해서 저장해야만 트랜잭션이 먹힌다.

      // 2. 유저의 돈 찾아오기
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id }, //
      // });

      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
      });

      // 3. 유저의 돈 업데이트하기
      // await this.usersRepository.update(
      //   { id: _user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction(); //트랜스액션 끝~

      // 4, 최종 결과 브라우저에 돌려주기
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // 로직 하나라도 실패하면 다 다시
    } finally {
      await queryRunner.release(); // DB랑 연결 끊기, 안끊으면 DB마비 됨
      //롤백을 했든, 커밋을 했든 이거해줘~  DB랑은 상관없음
    }
  }
}
