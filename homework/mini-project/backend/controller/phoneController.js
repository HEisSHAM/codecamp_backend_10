//prettier-ignore
import {checkPhone, getToken,sendTokenToSMS,} from "./services/phone.token.service.js";
import { Token } from "../model/tokenSchema.js";

export class PhoneController {
  PhoneNewToken = async (req, res) => {
    const myPhone = req.body.phone;
    const myToken = getToken();
    const isValid = checkPhone(myPhone);
    if (isValid === false) return;
    const token = new Token({
      token: myToken,
      phone: req.body.phone,
      isAuth: false,
    });

    const result = await Token.findOne({ phone: myPhone });
    if (!result) {
      await token.save();
    } else {
      await Token.updateOne({ phone: myPhone }, { token: myToken });
    }
    sendTokenToSMS(myPhone, myToken);
    res.send(`${myPhone}으로 인증 문자가 전송되었습니다.`);
    console.log(myPhone, myToken);
  };

  PhoneCheckToken = async (req, res) => {
    const result = await Token.findOne({ phone: req.body.phone });

    if (!result) {
      res.send("fail");
    } else {
      if (result.token === req.body.token) {
        await Token.updateOne({ phone: req.body.phone }, { isAuth: true });
        res.send("true");
      }
    }
  };
}
