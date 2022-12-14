import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
//prettier-ignore
import {checkEmail, getWelcomeTemplate, sendTemplateToEmail,}
from "./email.js";
import "dotenv/config"; // 추가!!
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(
  "/starbucks-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(options))
);
app.use(cors());
app.get("/users", (req, res) => {
  const result = [
    {
      email: "aa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "bb@gmail.com",
      name: "영수",
      phone: "010-1234-9999",
      personal: "220110-3333333",
      prefer: "https://google.com",
    },
    {
      email: "cc@gmail.com",
      name: "영희",
      phone: "010-1234-8888",
      personal: "220110-4444444",
      prefer: "https://heybaby.com",
    },
    {
      email: "dd@gmail.com",
      name: "덕수",
      phone: "010-1234-7777",
      personal: "220110-5555555",
      prefer: "https://sohard.com",
    },
    {
      email: "ee@gmail.com",
      name: "광철",
      phone: "010-1234-6666",
      personal: "220110-6666666",
      prefer: "https://supercoding.com",
    },
  ];

  res.send(result);
});

app.get("/starbucks", (req, res) => {
  const coffee = [
    { name: "딸기에이드", kcal: 150 },
    { name: "청귤에이드", kcal: 120 },
    { name: "자몽에이드", kcal: 190 },
    { name: "석류에이드", kcal: 200 },
    { name: "레몬에이드", kcal: 110 },
    { name: "사과에이드", kcal: 100 },
    { name: "키위에이드", kcal: 190 },
    { name: "수박에이드", kcal: 220 },
    { name: "유자에이드", kcal: 330 },
    { name: "파워에이드", kcal: 440 },
  ];
  res.send(coffee);
});

app.post("/tokens/phone", (req, res) => {
  const myPhone = req.body.myphone;
  //1. 휴대폰 번호 자릿수 맞는지 확인 (10~11자리)
  const isValid = checkPhone(myPhone);
  if (isValid === false) return;
  //2. 인증번호 토큰 6자리 만들기
  const myToken = getToken();
  //3. 핸드폰 번호에 토큰 전송하기
  sendTokenToSMS(myPhone, myToken);
  res.send("인증완료!!!");
});

app.post("/users", (req, res) => {
  const { name, personal, myPhone, site, email, pw } = req.body;
  const isValid = checkEmail(email);
  if (isValid === false) return;
  const myTemplate = getWelcomeTemplate({ name, myPhone, site, getToday() {} });
  sendTemplateToEmail(email, myTemplate);
  res.send("가입완료!!!");
});

mongoose
  .connect("mongodb://db:27017/mydocker10")
  //도커 컴퓨터의 IP에 연결하는 것 => 네임 리졸루션
  .then(() => {
    console.log("==============================");
    console.log("DB 접속에 성공하였습니다.");
    console.log("==============================");
  })
  .catch(() => {
    console.log("==============================");
    console.log("DB 접속에 실패하였습니다.");
    console.log("==============================");
  });

app.listen(4000, () => {
  console.log("백앤드 API 서버가 켜졌어요!!!");
});

//231231232313--
app.post("/tokens/phone", async (req, res) => {
  const myPhone = req.body.phone;
  const myToken = getToken();
  const isValid = checkPhone(myPhone);
  if (isValid === false) return;

  const token = new Token({
    token: myToken,
    phone: req.body.phone,
    isAuth: false,
  });

  const result = await Token.findOne({ phone: myPhone });
  if (!result) {
    await token.save();
  } else {
    await Token.updateOne({ phone: myPhone }, { token: myToken });
  }
  //   sendTokenToSMS(myPhone, myToken);
  res
    .send(`${myPhone} 으로 인증 문자가 전송되었습니다.`)
    .then(() => {
      console.log("전송 성공");
    })
    .catch(() => {
      console.log("에러 발생");
    });
});
