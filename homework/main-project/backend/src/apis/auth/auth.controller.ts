import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    hashedPassword: string;
    age: number;
    nickname: string;
  };
}

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    //회원조회
    let user = await this.usersService.findOne({ email: req.user.email });
    //회원 가입 안했으면, 가입시켜서 유저에 할당
    if (!user) user = await this.usersService.create({ ...req.user });
    // 회원가입이 되어 있다면, 로그인(refreshToken만 만들어서 브라우저로 전송)
    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/login/index.html');
  }

  @UseGuards(AuthGuard('naver'))
  @Get('/login/naver')
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.usersService.findOne({ email: req.user.email });

    if (!user) user = await this.usersService.create({ ...req.user });

    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/login/index.html');
  }

  @UseGuards(AuthGuard('kakao'))
  @Get('/login/kakao')
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.usersService.findOne({ email: req.user.email });

    if (!user) user = await this.usersService.create({ ...req.user });

    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/login/index.html');
  }
}
