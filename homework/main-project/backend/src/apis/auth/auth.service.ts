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

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken = ${refreshToken}; path=/;`);
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken) {
    return this.jwtService.sign(
      { email: user.email, id: user.id }, //
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
    );
  }
}
