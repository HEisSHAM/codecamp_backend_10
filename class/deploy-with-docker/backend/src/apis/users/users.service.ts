import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUsersServiceCreate,
  IUsersServiceFindOne,
} from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOne({ email }: IUsersServiceFindOne): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({
    email,
    hashedPassword: password,
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    // if (user) throw new HttpException('이미 가입된 계정입니다.', HttpStatus.CONFLICT);
    if (user) throw new ConflictException();

    return this.usersRepository.save({ email, password, name, age });
  }
}
