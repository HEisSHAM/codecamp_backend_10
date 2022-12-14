import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/types/context';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string, //
    @Context() context: IContext,
  ): Promise<string> {
    //
    const user = await this.usersService.findOne({ email });
    //
    if (!user)
      throw new UnprocessableEntityException('이메일 혹은 암호가 틀렸습니다.');
    //
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('이메일 혹은 암호가 틀렸습니다.');
    //
    this.authService.setRefreshToken({ user, res: context.res });
    //
    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ): string {
    return this.authService.getAccessToken({ user: context.req.user });
  }
}
