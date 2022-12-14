// 타입 추론
let aaa = "안녕하세요";
aaa = 3;

// 타입명시
let bbb: string = "반갑습니다";

// 타입명시가 필요한 상황
let ccc: number | string = 1000;
ccc = "1000원";

// 숫자타입
let ddd: number = 10;
ddd = "철수";

//불린타입
let eee: boolean = true;
eee = false;
eee = "false"; //true로 작동함 (문자열안에 뭐라도 들어있으면)

//배열타입
let fff: number[] = [1, 2, 3, 4, 5];
let ggg: string[] = ["철수", "영희", "훈이"];
let hhh: (string | number)[] = [1, "영수", 3, "민수"]; // 타입을 추론해서 어떤 타입을 사용하는 지 알아보기

//객체타입
interface IProfile {
  name: string;
  age: string | number;
  school: string;
  hobby?: string; // ? => 있어도되고 없어도 됨
}

const profile: IProfile = {
  name: "철수",
  age: 8,
  school: "공룡초",
};

profile.name = "훈이"; // 타입추론으로인해 이것만 가능
profile.age = "8살";
profile.hobby = "수영";

// 함수타입 ==> 어디에서 몇번이든 호출 가능하므로 추론 못함, 명시해줘야됨
function add(num1: number, num2: number, unit: string): string {
  return num1 + num2 + unit;
}
//  type : any (아무거나) (객체의 키 값 지정안 할 경우)
//  리턴값도 ) 와 { 사이에 지정 가능
const result = add(1000, 2000, "원");

const add2 = (num1: number, num2: number, unit: string): string => {
  return num1 + num2 + unit;
};

const result2 = add2(1000, 2000, "원");

//any타입
let qqq: any = "철수"; // 자바스크립트와 동일함
qqq = 123;
qqq = true;
