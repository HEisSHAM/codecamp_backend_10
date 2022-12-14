class myCar {
  style = "콤부차";
  hp;
  color = "red";

  constructor(HP) {
    this.hp = HP;
  }

  출발 = () => {
    console.log(`${this.hp} 마력의 ${this.color} ${this.style} 출발`);
  };

  정지 = () => {
    console.log(`${this.hp} 마력의 ${this.color} ${this.style} 정지`);
  };
}

const mycar = new myCar(5000);
mycar.출발();
mycar.정지();
