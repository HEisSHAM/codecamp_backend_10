import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    // this.pointsTransactionsRepository.create(), //등록을 위한 빈 객체 생성 DB로 안감
    // this.pointsTransactionsRepository.insert(), // 결과는 못받는 등록
    // this.pointsTransactionsRepository.update(), // 결과는 못받는 수정

    // 1. PointTransaction 테이블에 거래 기록 1줄 생성
    const pointTransaction = this.pointsTransactionsRepository.create({
      impUid,
      amount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    await this.pointsTransactionsRepository.save(pointTransaction);

    // 2. 유저의 돈 찾아오기
    const user = await this.usersRepository.findOne({
      where: { id: _user.id }, //
    });

    // 3. 유저의 돈 업데이트하기
    await this.usersRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );

    // 4, 최종 결과 브라우저에 돌려주기

    return pointTransaction;
  }
}
