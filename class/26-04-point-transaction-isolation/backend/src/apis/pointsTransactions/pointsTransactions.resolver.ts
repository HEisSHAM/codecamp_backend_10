import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Int, Context } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { PointsTransactionsService } from './pointsTransactions.service';
import { IContext } from 'src/commons/types/context';
import { PointTransaction } from './entities/pointTransaction.entity';

@Resolver()
export class PointsTransactionsResolver {
  constructor(
    private readonly pointsTransactionsService: PointsTransactionsService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ): Promise<PointTransaction> {
    const user = context.req.user;
    return this.pointsTransactionsService.create({ impUid, amount, user });
  }
}
