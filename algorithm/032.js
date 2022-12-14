// new Date()를 이용하여 "오늘은 0000년 00월 00일 입니다." 라는 문구를 만들어 보세요.

let Today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = String(date.getDate()).padStart(2, "0");

  //prettier-ignore
  console.log("오늘은 " + year + "년 " + month + "월 " + day + "일 " + "입니다.");
};

Today();
