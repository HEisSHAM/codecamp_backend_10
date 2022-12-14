// 입력되는 score에 따라 알맞은 등급을 적어야 합니다.
// 100~90 → "A"
// 89~80 → "B"
// 79~70 → "C"
// 69~60 → "D"
// 59점 이하는 "F"
// 100점 초과나 0점 미만은 "잘못된 점수입니다"라는 문구를 띄워주세요.

const grade = function (score) {
  if (score > 100 || score < 0) {
    return "잘못된 점수입니다.";
  } else if (score < 60 && score >= 0) {
    return "F";
  } else if (score <= 100 && score >= 90) {
    return "A";
  } else if (score < 90 && score >= 80) {
    return "B";
  } else if (score < 80 && score >= 70) {
    return "C";
  } else if (score < 70 && score >= 60) {
    return "D";
  }
};

grade();
