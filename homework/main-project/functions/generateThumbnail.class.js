const sharp = require("sharp");

//exports. 는 commonjs 방식
exports.generateThumbnail = async (event, context) => {
  console.log("===============");
  console.log("event", event);
  console.log("context", context);
  console.log("===============");

  if (event.name.includes("thumb/")) return; //이미 썸네일이 있는 경우 종료 없으면 폴더를 계속만든다.

  // 썸네일 프로세스 3개의 promise를 하나의 promise all 배열로 묶기
  const storage = new Storage().bucket(event.bucket);
  const prefix = event.name.split("/origin")[0];
  const postfix = event.name.split("/origin")[1];

  await Promise.all(
    [
      { size: 320, fname: `${prefix}/thumb/s/${postfix}` },
      { size: 640, fname: `${prefix}/thumb/m/${postfix}` },
      { size: 1280, fname: `${prefix}/thumb/l/${postfix}` },
    ].map(
      (el) =>
        new Promise((resolve, reject) => {
          storage
            .file(event.name)
            .createReadStream() // 기존 파일 읽어오기
            .pipe(sharp().resize({ width: el.size })) //썸네일 생성
            .pipe(storage.file(`el.fname`).createReadStream()) //새로운 썸네일 재업로드
            .on("finish", () => resolve())
            .on("error", () => reject());
        })
    )
  );
};
