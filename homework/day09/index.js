import express, { application } from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import cors from "cors";
import mongoose from "mongoose";
import { Token } from "./models/token.model.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/tokens/phone", async (req, res) => {
  const myPhone = req.body.phone;
  const myToken = getToken();
  console.log(myPhone, myToken);
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
  sendTokenToSMS(myPhone, myToken);
  res.send(`${myPhone} 으로 인증 문자가 전송되었습니다.`);
});

app.patch("/tokens/phone", async (req, res) => {
  const result = await Token.findOne({ phone: req.body.phone });

  if (!result) {
    res.send("fail");
  } else {
    if (result.token === req.body.token) {
      await Token.updateOne({ phone: req.body.phone }, { isAuth: true });
      res.send("true");
    }
  }
});

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
  console.log("백앤드 API 서버가 실행되었습니다.");
});
