import { checkPhone } from "./services/phone/check.service.js";
import { sendTokenToSMS } from "./services/phone/send.sms.service.js";
import { getToken } from "./services/phone/get.token.service.js";

export class PhoneController {
  phoneIdentify = (req, res) => {
    const myPhone = req.body.qqq;
    const isValid = checkPhone(myPhone);
    if (isValid === false) return;
    const myToken = getToken();
    sendTokenToSMS(myPhone, myToken);
    res.send("인증완료!!!");
  };
}
