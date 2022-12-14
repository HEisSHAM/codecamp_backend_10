import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie; //refreshToken=qwadjlakjd
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },

      secretOrKey: process.env.JWT_REFRESH_KEY,
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
