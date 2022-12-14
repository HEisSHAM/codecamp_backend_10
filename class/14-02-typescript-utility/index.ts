interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

//1, Partial 타입
type aaa = Partial<IProfile>;

//2, Required 타입
type bbb = Required<IProfile>;

//3, Required 타입
type ccc = Pick<IProfile, "name" | "age">;

//4. Omit 타입
type ddd = Omit<IProfile, "school">;

//5. Record 타입
type eee = "철수" | "영희" | "훈이"; // union 타입
let child: eee;
child = "철수"; // union 지정된 것만 할당 가능

type fff = Record<eee, IProfile>; // record 타입

type ggg = keyof IProfile; // "name", "age", "school", "hobby" 가 담기는 union 타입
let myprofile: ggg;

//
//
// ========( type vs interface) ===========
interface IProfile {
  candy: number; // 기존 프로필에 새로운 키값 추가됨
}
