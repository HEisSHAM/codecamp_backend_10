import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const app = express();

//상품 구매하기 API
app.post("/products/buy", (req, res) => {
  //1. 가진 돈 검증하는 코드 (10줄 -> 2줄로 줄임)
  const cashService = new CashService();
  const hasMoney = cashService.checkValue();

  //2. 판매 여부 검증하는 코드 (10줄 -> 2줄로 줄임)
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();

  //3.상품 구매하는 코드
  if (hasMoney && !isSoldout) {
    res.send("상품 구매 완료");
  }
});

//상품 환불하기 API
app.post("/product.refund", (req, res) => {
  //1. 판매 여부 검증하는 코드 (10줄 -> 2줄로 줄임)
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();

  //2. 상품 환불하는 코드
  if (isSoldout) {
    res.send("싱품환불환료");
  }
});

app.listen(3000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});
