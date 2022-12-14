import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { CashService } from "./mvc/controllers/services/cash.service.js";
import { PointService } from "./mvc/controllers/services/point.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";

const app = express();

const productService = new ProductService();
const cashService = new CashService(); // 1. new 한번으로 모든 곳에 재사용 가능 ==> (싱글톤패턴)
const pointService = new PointService(); // 2. 쿠폰 구매 방식이 포인트 결제로 변경됨 (의존성 주입), 컨트롤러 코드 건들지 않고 ()안에 변경하여 주입

//상품 API
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct); //상품 구매하기 API

app.post("/product.refund", productController.refundProduct); //상품 환불하기 API

//쿠폰(상품권) API
const couponController = new CouponController(pointService); //여기 통해서 의존성 주입
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰구매하기 API

//게시판 API
// app.get("/boards/...")

app.listen(3000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});

// 이걸 왜했냐?
//1. ProductController가 CashService에 의존하고 있음 (이 때 CashService --> 의존성)
//    =====> 위와 같은 상황을 "강하게 결합되어 있다" 라고 표현 (tight-coupling)

//2. 개선하기 위히여 "느슨한 결합"으로 변경할 필요가 있음 ==> (loose-coupling)
//    =====> 위와 같은 변경을 위해서 밖에서 "의존성 주입" 해줌 (캐시서비스를 주입시킴) --> (dependency injection) (DI)
//    =====> 이 역할을 대신 해주는 Nest.js 도구 => IoC 컨테이너 (DI 해주는 애)

//3. "의존성 주입"으로 new를 2번 이상 할 필요가 없어짐. 또한 하나의 의존성을 여러 곳에서 재사용 => 싱글톤 패턴 => 대상 class의 소스코드를 직접 수정하지 않고 변경 가능(cashService -> pointService로 바꿔치기함 함수 () 안에 수정해서)

//4. "의존성 주입"이면, "싱글톤 패턴" 인가? ==> X 아님 (디폴트가 "싱글톤" 일뿐 바꿀 수 있다.)

// DI 프레임워크 (알아서 의존성 주입 해주는 것) ==> 스프링 프레임 워크 (자바꺼)
// 이에 자바스크립트를 위해 개발한 것이 Nest.js이다.
