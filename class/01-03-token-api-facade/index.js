function checkPhone(myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

function getToken() {
  let result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

function sendTokenToSMS(myPhone, result) {
  console.log(myPhone + "번호로 인증번호" + result + "를 전송합니다.");
}

function createTokenOfPhone(myPhone) {
  //1. 휴대폰 번호 자릿수 맞는지 확인 (10~11자리)
  const isValid = checkPhone(myPhone);
  if (isValid === false) return;
  //2. 인증번호 토큰 6자리 만들기
  const myToken = getToken();
  //3. 핸드폰 번호에 토큰 전송하기
  sendTokenToSMS(myPhone, myToken);
}

createTokenOfPhone("01012345678");
