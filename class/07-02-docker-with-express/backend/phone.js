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
  const messageService = new mysms(
    "NCSAXBRASWMGXPOW",
    "AAPASH5BVEBYBJK21C8XIRWCMJDHP5FI"
  );
  const result = await messageService.sendOne({
    to: myPhone,
    from: "01033402365",
    text: `[람쥐생명] 안녕하세요, 요청하신 인증 번호는 ${myToken} 입니다.`,
  });
  console.log(result);
  // console.log(myPhone + "번호로 인증번호" + myToken + "를 전송합니다.");
}
