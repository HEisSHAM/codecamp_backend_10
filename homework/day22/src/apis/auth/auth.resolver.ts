import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

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
  ): Promise<string> {
    const user = await this.usersService.findOne({ email });
    if (!user)
      throw new UnprocessableEntityException('이메일 혹은 암호가 틀렸습니다.');
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('이메일 혹은 암호가 틀렸습니다.');
    return this.authService.getAccessToken({ user });
  }
}
