import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/types/context';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService, //
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<string> {
    //로그인 로직
    //   1. DB에서 이메일이 일치하는 유저 찾기
    const user = await this.usersService.findOne({ email });

    //   2. 일치하는 유저가 없으면? 에러 던지기!
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    //   3. 일치하는 유저가 있는데, 비밀번호가 틀리면? 에러!
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    //   4. Refresh Token (JWT)을 만들어서 프론트엔드 브라우저 쿠키에 저장해서 보내주기
    this.authService.setRefreshToken({ user, res: context.res });

    //   5. 모두 일치하면 JWT 토큰 만들어서 보내기
    //      ==> accessToken(JWT)만들어서 브라우저로 전달
    return this.authService.getAccessToken({ user });
  }
}
