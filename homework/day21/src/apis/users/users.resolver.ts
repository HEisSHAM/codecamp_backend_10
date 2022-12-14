import { Args, Mutation, Resolver, Int, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update.user.input';

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
    @Args('userId') userId: string, //
  ): Promise<User> {
    return this.usersService.findOne({ userId });
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
    @Args('userId') userId: string,

    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.usersService.findOne({ userId });

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
}
