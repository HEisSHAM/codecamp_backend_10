import { Args, Mutation, Resolver, Int, Query, Context } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update.user.input';
import { UseGuards } from '@nestjs/common';
import { IContext } from 'src/commons/types/context';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //find all
  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //find one
  @Query(() => User)
  fetchUser(
    @Args('email') email: string, //
  ): Promise<User> {
    return this.usersService.findOne({ email });
  }

  //create
  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('nickname') nickname: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      email,
      name,
      age,
      nickname,
      hashedPassword,
    });
  }

  //update
  @Mutation(() => User)
  async updateUser(
    @Args('email') email: string,

    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.usersService.findOne({ email });

    return this.usersService.update({
      user,
      updateUserInput,
    });
  }

  //Delete
  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return this.usersService.delete({ userId });
  }

  //DeleteLogin
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteLoginUser(@Context() context: IContext) {
    return this.usersService.deleteLogin({ context });
  }

  //Guard
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  authUser(
    @Context() context: IContext, //
  ): string {
    console.log(context.req.user);
    return '인가 성공';
  }

  //FetchLoginUser
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoginUser(@Context() context: IContext) {
    console.log(context.req.user.email);
    return this.usersService.findLogin({ context });
  }
}
