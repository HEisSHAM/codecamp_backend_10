// 입력되는 달(month)에 따라 각 달에 며칠이 있는지 보여주는 함수를 만들려고 합니다.
// 각 조건에 해당하는 알맞은 값을 입력해주세요.

const days = function days(month) {
  const monthList = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  return monthList[month];
};

//   if (month === 1) {
//     return 31;
//   } else if (month === 2) {
//     return 28;
//   } else if (month === 3) {
//     return 31;
//   } else if (month === 4) {
//     return 30;
//   } else if (month === 5) {
//     return 31;
//   } else if (month === 6) {
//     return 30;
//   } else if (month === 7) {
//     return 31;
//   } else if (month === 8) {
//     return 31;
//   } else if (month === 9) {
//     return 30;
//   } else if (month === 10) {
//     return 31;
//   } else if (month === 11) {
//     return 30;
//   } else if (month === 12) {
//     return 31;
//   }
// }
