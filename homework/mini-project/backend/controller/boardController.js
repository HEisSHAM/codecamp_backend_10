//prettier-ignore
import {checkEmail, masking, getWelcomeTemplate, sendTemplateToEmail, maskingNum} 
from "./services/board.user.service.js";
import { Token } from "../model/tokenSchema.js";
import { User } from "../model/userSchema.js";
import { getOG } from "../model/cheerio.js";

export class BoardController {
  SendTemplate = async (req, res) => {
    const { name, email, personal, prefer, pwd, phone } = req.body;
    const scrap = await getOG(prefer);
    const userID = await User.findOne({ phone: phone });
    const myTemplate = getWelcomeTemplate({ name, phone, prefer });
    const user = new User({
      name: name,
      email: email,
      personal: maskingNum(personal),
      prefer: prefer,
      pwd: pwd,
      phone: phone,
      og: {
        title: scrap[0],
        description: scrap[3],
        image: scrap[2],
      },
    });

    const isValid = checkEmail(email);
    if (isValid === false) return;
    if (isValid === true) {
      masking(personal);
    }

    const findToken = Token.findOne({ phone: req.body.phone });
    if (!findToken || findToken.isAuth === false) {
      res.status(422);
      res.send("에러!!");
    } else {
      sendTemplateToEmail(email, myTemplate);
      res.send(userID._id);
      await user.save();
    }
  };
  GetUserInfo = async (req, res) => {
    const result = await User.find();
    res.send(result);
  };
}
