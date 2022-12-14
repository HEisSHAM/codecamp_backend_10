import { Module } from '@nestjs/common';
import { PointsTransactionsResolver } from './pointsTransactions.resolver';
import { PointsTransactionsService } from './pointsTransactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointTransaction } from './entities/pointTransaction.entity';
import { User } from 'src/apis/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
      User,
    ]),
  ],

  providers: [
    PointsTransactionsResolver, //
    PointsTransactionsService,
  ],
})
export class PointsTransactionsModule {}
