function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
}

getToken();

// console.log("abc".padStart(10, "G")); 문자도 가능하다
// console.log(Math.floor(13.23123));

//API로 만들어보자
