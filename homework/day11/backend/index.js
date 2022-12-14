import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { PhoneController } from "./controller/phoneController.js";
import { BoardController } from "./controller/boardController.js";

const app = express();
app.use(express.json());
app.use(cors());

const boardController = new BoardController();
const phoneController = new PhoneController();

app.get("/boards", boardController.getInfo);
app.post("/boards", boardController.newUser);
app.post("/users", boardController.newUser);
app.post("/tokens/phone", phoneController.phoneIdentify);

mongoose
  .connect("mongodb://my-database:27017/mydocker10")

  .then(() => {
    console.log("==============================");
    console.log("DB 접속에 성공하였습니다.");
    console.log("==============================");
  })
  .catch(() => {
    console.log("============================");
    console.log("DB 접속에 실패하였습니다.");
    console.log("============================");
  });

app.listen(3000, () => {
  console.log("백앤드 API 서버가 켜졌어요!!");
});
