import { Board } from "../model/board.model.js";
//prettier-ignore
import {checkEmail, getWelcomeTemplate, sendTemplateToEmail,} from "./services/email/email.service.js";

export class BoardController {
  welcomeUser = (req, res) => {
    const { name, age, school, email } = req.body;
    const isValid = checkEmail(email);
    if (isValid === false) return;
    const myTemplate = getWelcomeTemplate({ name, age, school });
    sendTemplateToEmail(email, myTemplate);
    res.send("가입완료!!!");
  };

  newUser = async (req, res) => {
    console.log(req);
    console.log("=============================");
    console.log(req.body);

    const board = new Board({
      writer: req.body.writer,
      title: req.body.title,
      contents: req.body.contents,
    });
    await board.save();
    res.send("게시물 등록에 성공하였습니다.");
  };

  getInfo = async (req, res) => {
    const result = await Board.find();
    res.send(result);
  };
}
