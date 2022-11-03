function customRegistrationNumber(num) {
  if (num[6] !== "-") {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return;
  } else if (num.length !== 14) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
  } else {
    let password = num.slice(0, 8).padEnd(14, "*");
    console.log(password);
  }
}

customRegistrationNumber("123456-1234567123123");
customRegistrationNumber("1234561231231234567");
customRegistrationNumber("123456-1234567");

function hypen() {
  if (num[6] !== "-") {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return;
  }
}

function length() {
  if (num.length !== 14) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
  }
}
