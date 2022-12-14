import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      scope: ['profile_nickname', 'account_email'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return {
      name: profile._json.properties.nickname,
      email: profile._json.kakao_account.email,
      age: 123,
      nickname: '닉네임',
      hashedPassword: '1234',
    };
  }
}
