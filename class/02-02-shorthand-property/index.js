// 1. shorthand-property

function qqq(aaa) {
  console.log(aaa); // 객체
  console.log(aaa.name);
  console.log(aaa.age);
  console.log(aaa.school);
}

const name = "철수";
const age = 12;
const school = "다람쥐초등학교";
// const profile = {
//   name: name,
//   age: age,
//   school: school,
// };

// const profile = { name, age, school }; // key와 value가 같아서 value 생략함 (shorthand-property)
// qqq(profile); // 객체를 function 안에 넣음

qqq({ name, age, school });
