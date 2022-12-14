import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { JwtGoogleStrategy } from '../../commons/auth/jwt-social-google.strategy';
import { JwtNaverStrategy } from '../../commons/auth/jwt-social-naver-strategy';
import { JwtKakaoStrategy } from '../../commons/auth/jwt-social-kakao-strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],

  providers: [
    AuthResolver, //
    AuthService,
    UsersService,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
  ],

  controllers: [AuthController],
})
export class AuthModule {}
