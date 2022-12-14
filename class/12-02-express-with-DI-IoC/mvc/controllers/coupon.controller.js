import { CashService } from "./services/cash.service.js";

export class CouponController {
  cashService;

  constructor(cashService) {
    this.cashService = cashService;
  } //의존성 주입 (cash service 자리에 주입이 되었다.)

  buyCoupon = (req, res) => {
    //1. 가진 돈 검증하는 코드
    // const cashService = new CashService();
    const hasMoney = this.cashService.checkValue();
    // 컨테이너가 함수에 의존.

    //2.쿠폰 구매하는 코드
    if (hasMoney) {
      res.send("쿠폰 구매 완료");
    }
  };
}
