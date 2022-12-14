// 휴대폰 인증 토큰 전송API를 요청해주세요.
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";

  let num1 = document.getElementById("PhoneNumber01").value;
  let num2 = document.getElementById("PhoneNumber02").value;
  let num3 = document.getElementById("PhoneNumber03").value;
  const myPhone = num1 + num2 + num3;
  await axios
    .post("http://localhost:3000/tokens/phone", {
      phone: myPhone,
    })
    .then((res) => {
      console.log("전송완료");
    });
};

// 핸드폰 인증 완료 API를 요청해주세요.
const submitToken = async () => {
  let num1 = document.getElementById("PhoneNumber01").value;
  let num2 = document.getElementById("PhoneNumber02").value;
  let num3 = document.getElementById("PhoneNumber03").value;
  const myPhone = num1 + num2 + num3;
  const token = document.getElementById("TokenInput").value;
  await axios
    .patch("http://localhost:3000/tokens/phone", {
      phone: myPhone,
      token: token,
    })
    .then((res) => {
      console.log("인증완료");
    })
    .catch((res) => {
      console.log("인증실패");
    });
};

// 회원 가입 API를 요청해주세요.
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value;
  const personal = document.getElementById("SignupPersonal").value;
  let num1 = document.getElementById("PhoneNumber01").value;
  let num2 = document.getElementById("PhoneNumber02").value;
  let num3 = document.getElementById("PhoneNumber03").value;
  const myPhone = num1 + num2 + num3;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pwd = document.getElementById("SignupPwd").value;

  await axios
    .post("http://localhost:3000/users", {
      name,
      personal,
      myPhone,
      prefer,
      email,
      pwd,
    })
    .then((res) => {
      console.log("가입성공");
    })
    .catch((res) => {
      console.log("가입실패");
    });
};
