import axios from "axios";

//1. 비동기 방식
function fetchAsync() {
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log("비동기방식:", result); //promise (pending)
}

fetchAsync();

//2. 동기 방식
async function fetchSync() {
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log("동기방식:", result); // 정상 데이터
}

const fetchSync = async () => {
  await axios.get("https://koreanjson.com/posts/1");
  console.log("동기방식:", result.data.title); // 화살표함수 버전
};

fetchSync();
