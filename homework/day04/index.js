import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
app.use(express.json());
app.use(
  "/starbucks-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(options))
);
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

app.listen(3000, () => {
  console.log("백앤드 API 서버가 켜졌어요!!!");
});
