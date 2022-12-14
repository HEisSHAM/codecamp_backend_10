import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  // body에 access 토큰 주고, 쿠키에 refresh token 주기

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );
    //개발환경
    //res에 저장만하면 access토큰 넘어갈때 알아서 같이 넘어감
    res.setHeader('Set-Cookie', `refreshToken = ${refreshToken}`);
  }

  // 배포환경
  // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`)
  // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
    );
  }
}
