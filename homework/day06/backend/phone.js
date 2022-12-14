import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;

export function checkPhone(myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  let result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

export async function sendTokenToSMS(myPhone, myToken) {
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const messageService = new mysms(SMS_KEY, SMS_SECRET);

  const result = await messageService.sendOne({
    to: myPhone,
    from: SMS_SENDER,
    text: `안녕하세요!! 인증 번호는 ${myToken} 입니다!!`,
  });
  console.log(result);
}
