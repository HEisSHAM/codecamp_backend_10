import nodemailer from "nodemailer";

export function getToday() {
  const aaa = new Date();
  const yyyy = aaa.getFullYear();
  const mm = aaa.getMonth() + 1;
  const dd = aaa.getDate();
  const today = `${yyyy}-${mm}-${dd}`;
  return today;
}

export function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function masking(personal) {
  personal.slice(0, 8).padEnd(14, "*");
  return personal;
}

export function getWelcomeTemplate({ name, phone, prefer }) {
  const mytemplate = `
          <html>
              <body>
                  <h1>${name}님 가입을 환영합니다!!!</h1>
                  <hr />
                  <div>이름: ${name}</div>
                  <div>전화번호: ${phone}</div
                  <div>좋아하는 사이트: ${prefer}</div>
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

export function maskingNum(num) {
  if (num[6] !== "-") {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return;
  } else if (num.length !== 14) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
  } else {
    num.slice(0, 8).padEnd(14, "*");
  }
}
