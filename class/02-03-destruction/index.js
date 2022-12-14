//1. 일반변수 전달하기 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// function zzz(aaa) {
//   console.log(aaa); //사과
// }

// zzz("사과");

// 2. 객체 전달하기 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// function zzz(aaa) {
//   // const aaa = basket

//   console.log(aaa);
//   console.log(aaa.apple);
//   console.log(aaa.banana);
// }

// const basket = {
//   apple: 3,
//   banana: 10,
// };
// zzz(basket);

//3. 객체 전달하기 - 구조분해할당 방식 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// function zzz({ apple, banana }) {
//   console.log(apple);
//   console.log(banana);
// }
// // const aaa = basket

// const basket = {
//   apple: 3,
//   banana: 10,
// };
// zzz(basket);

//4. 객체 구조분해할당 방식으로 전달하기 + shorthand-property  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function zzz({ apple, banana }) {
  console.log(apple);
  console.log(banana);
}

const apple = 3;
const banana = 10;
const basket = { apple, banana };
zzz({ apple, banana });
