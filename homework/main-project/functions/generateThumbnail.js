const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp"); //옛날 문법, require이 없으면 import가 되지 않는다.

exports.ThumbnailTrigger = async (event) => {
  //export. 또한 예전 문법이며, 이게 있어야만 GCP에서 먹힌다.
  if (event.name.includes("thumb/")) return;
  // 문제 2번에 해당하는 코드, return 을 안해주면 함수가 쭉쭉쭉 돌기 때문에 return을 해야 처음 값을 찾을때 함수가 멈춘다.

  const option = [
    [320, "s"],
    [640, "m"],
    [1280, "l"],
  ]; // 우리 문제에서 요청한대로 사이즈별 width를 객체로 담아서 아래쪽 MAP에 쭈루룩 담기 위함.

  const name = event.name; //우리가 postmane으로 찍을 때, 지정한 이름이 담기는 event.name을 변수 name에 담아준다.
  const storage = new Storage().bucket(event.bucket); // storage에 나의 bucket을 가져와서 변수 storage로 담아준다.
  await Promise.all(
    // promise all을 통해
    option.map(([size, dir]) => {
      //위에 정의한 객체에 map으로 0번째 index부터 차례로 받아옴.
      return new Promise((resolve, reject) => {
        storage
          .file(name) //event 객체에서 따온 이름
          .createReadStream() // storage에서 읽어오자.
          .pipe(sharp().resize({ width: size })) // sharp.resize를 통해서 사이즈 재조정 (size는 option의 1번째 인자 320, 640, 1280)
          .pipe(storage.file(`thumb/${dir}/${name}`).createWriteStream()) // 저장할 주소 /thumb /(사이즈) /(event에서 따온 이름)
          .on("finish", () => resolve())
          .on("error", () => reject());
      });
    })
  );
};
