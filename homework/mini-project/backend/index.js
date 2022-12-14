import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { PhoneController } from "./controller/phoneController.js";
import { BoardController } from "./controller/boardController.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

const phoneController = new PhoneController();
const boardController = new BoardController();

//회원가입
app.post("/users", boardController.SendTemplate);
//회원목록 조회
app.get("/users", boardController.GetUserInfo);
//토큰인증 요청
app.post("/tokens/phone", phoneController.PhoneNewToken);
//토큰조회
app.patch("/tokens/phone", phoneController.PhoneCheckToken);

mongoose
  .connect("mongodb://db:27017/mydocker")
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

app.listen(3000, () => {
  console.log("==============================");
  console.log("백앤드 API 서버가 실행되었습니다.");
  console.log("==============================");
});
