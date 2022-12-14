let pw;
let pwCheck;

let validation = (pw, pwCheck) => {
  if (pw.length < 8 || pw.length > 16) {
    return "비밀번호는 8~16 자리여야 합니다";
  } else if (pw.toLowerCase() != pwCheck.toLowerCase()) {
    return "비밀번호를 다시 확인해주세요";
  } else if (pw === pwCheck) {
    return true;
  }
};

validation("a1B2c3D4", "A1b2C3d4");
validation("1234", "1234");
validation("12341234", "12341234");
