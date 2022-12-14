import { getToday } from "../date/get.today.service.js";
import nodemailer from "nodemailer";

export function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, age, school }) {
  const mytemplate = `
          <html>
              <body>
                  <h1>${name}님 가입을 환영합니다!!!</h1>
                  <hr />
                  <div>이름: ${name}</div>
                  <div>나이: ${age}</div>
                  <div>학교: ${school}</div>
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
      user: "cpdp9999@gmail.com",
      pass: "xfvnacctslhutosy",
    },
  });

  const result = await transporter.sendMail({
    from: "cpdp9999@gmail.com",
    to: myemail,
    subject: "[코드캠프] 가입을 축하합니다!!!",
    html: mytemplate,
  });
  console.log(result);
}
