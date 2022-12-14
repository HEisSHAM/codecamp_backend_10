import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;

export function sendTokenToSMS(myPhone, myToken) {
  const messageService = new mysms(
    "NCSAXBRASWMGXPOW",
    "AAPASH5BVEBYBJK21C8XIRWCMJDHP5FI"
  );
  const result = messageService.sendOne({
    to: myPhone,
    from: "01033402365",
    text: `[코드캠프] 안녕하세요, 요청하신 인증 번호는 ${myToken} 입니다.`,
  });
  console.log(result);
}
