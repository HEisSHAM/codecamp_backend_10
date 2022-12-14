import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //검증 실패시 에러 던지고, 성공하면 validate 실행
      //   jwtFromRequest: (req) => {
      //     console.log(req);
      //     const temp = req.headers.Authorization; // Bearer !@#!@#!@#!@#
      //     const accessToken = temp.toLowercase().replace('bearer ', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY, // 토큰 + 토큰만료시간 + 비밀번호까지 PassportStrategy에서 검증
    });
  }

  validate(payload) {
    console.log(payload); // {email: a@a.com, sub: asdasdsadasd(id)}
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
