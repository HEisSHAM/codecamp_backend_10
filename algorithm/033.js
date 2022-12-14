// 한 유저가 이메일을 아이디로 사용하여 회원가입을 하려고 합니다.
// 이메일을 아이디로 사용할 때, 몇 가지 조건이 있습니다.
// 해당 조건에 맞춰 데이터를 저장해주세요.

// 1. 이메일에 "@"가 있는지 검사해야 합니다.
// 2. 이메일 앞 뒤에는 공백이 없어야 합니다.
// 3. 이메일을 데이터베이스에 저장할 때는 모두 소문자로 변환되어야 합니다.
// 위 조건들을 순차적으로 진행해야 합니다.

let Email = "coDecAmp@gamil.com ";

let Snail = () => {
  if (email.includes("@")) {
    return true;
  } else {
    return false;
  }
};

let Space = () => {
  if (email.includes("")) {
    return false;
  }
};

let Lowercase = () => {
  console.log(email.toLowerCase());
};

function EmailCheck(Email) {
  if (Snail || Space === false) {
    return;
  } else {
    Lowercase(Email);
  }
}

EmailCheck();
