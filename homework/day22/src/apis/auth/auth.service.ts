import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthServiceGetAccessToken } from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  getAccessToken({ user }: IAuthServiceGetAccessToken) {
    return this.jwtService.sign(
      { email: user.email, id: user.id }, //
      { secret: '112233', expiresIn: '1w' },
    );
  }
}
