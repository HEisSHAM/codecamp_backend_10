import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IUsersServiceCreate,
  IUsersServiceDelete,
  IUsersServiceFindOne,
  IUsersServiceUpdate,
} from '../interfaces/IFoodsService';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  //FindAll
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //FindOne
  findOne({ userId }: IUsersServiceFindOne): Promise<User> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  //Create
  async create({
    email,
    hashedPassword: password,
    name,
    age,
    nickname,
  }: IUsersServiceCreate): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) throw new ConflictException();

    return this.usersRepository.save({ email, password, age, name, nickname });
  }

  //Update
  update({ user, updateUserInput }: IUsersServiceUpdate): Promise<User> {
    const result = this.usersRepository.save({
      ...user, //
      ...updateUserInput,
    });
    return result;
  }

  //Delete
  async delete({ userId }: IUsersServiceDelete): Promise<boolean> {
    const result = await this.usersRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }
}
