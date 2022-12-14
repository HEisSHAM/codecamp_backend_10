// const express = require("express"); 옛날방식 => commonjs
import express from "express"; /////// 요즘방식 => module
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"; /////// (export 함수 가져오기
// import * as qqq from './phone.js'                                ////// (함수 전부 다 가져오기)
// import (qwe,아무이름) from ./phone.js                              ////// (export default 가져옴)
// import (qwe,아무이름), { checkPhone, getToken,} from "./phone.js"; ////// export default + export 함수 함께 가져오기

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.get("/boards", (req, res) => {
  // 1.DB에 접속 후, 데이터를 조회 => 데이터 조회했다고 가정
  const result = [
    { number: 1, writer: "철수", title: "제목", content: "내용" },
    { number: 2, writer: "영희", title: "제에모옥", content: "내에요옹" },
    { number: 3, writer: "훈이", title: "제모모옥", content: "내요오옹" },
  ];

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(res) 주기
  console.log("aaaaaa");
  res.send(result);
});

app.post("/boards", (req, res) => {
  //1. 브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log("=============================");
  console.log(req.body);

  //2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

  //3. DB에 저장되 결과를 브라우저에 응답(res) 주기
  res.send("게시물 등록에 성공하였습니다.");
});

app.post("/tokens/phone", (req, res) => {
  const myPhone = req.body.qqq;

  //1. 휴대폰 번호 자릿수 맞는지 확인 (10~11자리)
  const isValid = checkPhone(myPhone);
  if (isValid === false) return;
  //2. 인증번호 토큰 6자리 만들기
  const myToken = getToken();
  //3. 핸드폰 번호에 토큰 전송하기
  sendTokenToSMS(myPhone, myToken);
  res.send("인증완료!!!");
});

app.listen(3000, () => {
  console.log("백앤드 API 서버가 켜졌어요!!!");
});
