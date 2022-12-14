import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";

const app = express();
const productController = new ProductController();
const couponController = new CouponController();
//상품 API
app.post("/products/buy", productController.buyProduct); //상품 구매하기 API
app.post("/product.refund", productController.refundProduct); //상품 환불하기 API

//쿠폰(상품권) API
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰구매하기 API

//게시판 API
// app.get("/boards/...");

app.listen(3000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});
