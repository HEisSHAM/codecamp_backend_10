function today() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDay();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  //prettier-ignore
  console.log("오늘은 "+year+"년 "+month+"월 "+day+"일 "+hour+":" +min +":" +sec+"입니다.");
}

today();
