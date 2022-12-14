import { ApolloServer, gql } from "apollo-server";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

const typeDefs = gql`
  # Board에 관한 Query는
  # 로직 내에 Query가 없는 채로 실행했을 때 나타나는
  # "Error: Query root type must be provided." 에러 방지를 위한 것입니다.
  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [BoardReturn]
  }

  type Mutation {
    # 1. 아래에 createTokenOfPhone API의 요청 데이터 타입을 지정해 주세요.
    createTokenOfPhone(myphone: String): String
  }
`;

const resolvers = {
  Query: {
    fetchBoards: (_, args) => {
      return [
        {
          number: 1,
          writer: "철수",
          title: "제목입니다",
          contents: "내용입니다",
        },
        {
          number: 2,
          writer: "영희",
          title: "좋은 날씨입니다",
          contents: "내용입니다",
        },
      ];
    },
  },

  Mutation: {
    createTokenOfPhone: (_, args) => {
      const myphone = args.myphone;

      // 1. 휴대폰번호 자릿수 맞는지 확인하기
      const isValid = checkValidationPhone(myphone);
      if (isValid) {
        // 2. 휴대폰 번호 자릿수가 맞다면 핸드폰 토큰 4자리 만들기
        const mytoken = getToken();

        // 3. 만든 토큰을 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(myphone, mytoken);
        return "인증완료!!!";
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.listen(3000).then(() => {
  console.log("백앤드 API 서버가 켜졌어요!!!");
});
