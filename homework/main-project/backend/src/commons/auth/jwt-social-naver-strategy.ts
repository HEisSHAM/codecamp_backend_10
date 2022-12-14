import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
      scope: ['email', 'age', 'nickname'],
    });
  }

  validate(accessToken, refreshToken, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      name: '강지훈',
      email: profile.emails[0].value,
      age: '123',
      nickname: profile.displayName,
      hashedPassword: '1234',
    };
  }
}
