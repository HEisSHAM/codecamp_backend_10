// class Aaa1 {
//   //매개 앞에 public, private, protected, readonly가 붙을 수 있다.
//   // 위 4개중 아무거나 하나 붙으면 알아서 할당함
//   power;
//   constructor(public mypower: any) {
//     // this.power = mypower // public, private, protected, readonly 중 하나라도 들어 있으면 자동으로 생성됨
//   }

//   ggg = () => {
//     console.log("나의 공격력은" + this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 가능
//   };
// }

// class Aaa2 extends Aaa1 {
//   kkk() {
//     console.log("나의 공격력은" + this.mypower); // 자식이 접근 가능
//     this.mypower = 10; // 자식이 수정 가능
//   }
// }

// const qqq = new Aaa2(50); // 값 넣으면 부모에게 올라감 -> 자녀 // 없고 자녀에 넣으면 super통해 자식이 부모에게 전달함
// qqq.ggg();
// qqq.kkk();
// console.log(qqq.mypower); // 밖에서 접근 가능
// qqq.mypower = 10; // 밖에서 수정 가능
