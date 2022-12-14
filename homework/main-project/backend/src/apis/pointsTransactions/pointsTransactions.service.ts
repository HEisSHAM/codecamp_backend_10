import {
  Injectable,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { User } from 'src/apis/users/entities/user.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  //////////////////////////////////////////////////////////////////////

  async checkDuplicate({ impUid }) {
    const findPayment = await this.pointsTransactionsRepository.findOne({
      where: { impUid },
    });
    if (findPayment) throw new ConflictException('이미 결제된 ID 입니다.');
  }
  //////////////////////////////////////////////////////////////////////

  async isCancelled({ impUid }) {
    const pointTransaction = await this.pointsTransactionsRepository.findOne({
      where: { impUid, status: POINT_TRANSACTION_STATUS_ENUM.CANCEL },
    });
    if (pointTransaction)
      throw new ConflictException('이미 취소된 결제 ID 입니다.');
  }

  //////////////////////////////////////////////////////////////////////

  async isRefund({ impUid }) {
    const findRefund = await this.pointsTransactionsRepository.findOne({
      where: { impUid },
    });
    if (findRefund.status === 'CANCEL') {
      throw new UnprocessableEntityException('이미 취소됨');
    }
  }

  //////////////////////////////////////////////////////////////////////

  async checkHasCancelablePoint({ impUid, user }) {
    const pointTransaction = await this.pointsTransactionsRepository.findOne({
      where: {
        impUid,
        user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      },
    });
    if (!pointTransaction)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');

    const currentUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    if (currentUser.point < pointTransaction.amount)
      throw new UnprocessableEntityException('포인트가 부족합니다.');
  }

  //////////////////////////////////////////////////////////////////////
  async cancel({ impUid, amount, user }) {
    const pointTransaction = await this.create({
      impUid,
      amount: -amount,
      user,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    return pointTransaction;
  }

  //////////////////////////////////////////////////////////////////////

  //1. 생성해서 한 줄 만들기
  async create({
    impUid,
    amount,
    user: _user,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect(); // DB접속, promise 필수
    await queryRunner.startTransaction('SERIALIZABLE'); // Transaction 시작
    try {
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status,
      });

      await queryRunner.manager.save(pointTransaction);

      // await this.pointsTransactionsRepository.save(pointTransaction);

      // 2. 유저의 돈 찾아오기
      const user = await this.usersRepository.findOne({
        where: { id: _user.id }, //
        lock: { mode: 'pessimistic_partial_write' },
      });

      // 3. 유저의 돈 업데이트하기
      await this.usersRepository.update(
        { id: user.id },
        { point: user.point + amount },
      );
      // await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction();
      // 4, 최종 결과 브라우저에 돌려주기
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
