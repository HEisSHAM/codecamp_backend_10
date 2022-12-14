import { getToday } from "./utils.js";
import nodemailer from "nodemailer";

export function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, myPhone, site }) {
  const mytemplate = `
          <html>
              <body>
                  <h1>${name}님 가입을 환영합니다!!!</h1>
                  <hr />
                  <div>이름: ${name}</div>
                  <div>전화번호: ${myPhone}</div
                  <div>좋아하는 사이트: ${site}</div>
                  <div>가입일: ${getToday()}</div>
              </body>
          </html>
      `;
  return mytemplate;
}

export async function sendTemplateToEmail(myemail, mytemplate) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const result = await transporter.sendMail({
    from: process.env.EMAIL_PASS,
    to: myemail,
    subject: "가입을 환영합니다^^",
    html: mytemplate,
  });
  console.log(result);
}
