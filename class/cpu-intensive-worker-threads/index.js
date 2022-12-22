const {} = require("worker_threads");

const start = () => {
  for (let i = 0; i < 9; i++) {
    const worker = new Worker("./worker.js");
    worker.postMessage(1000000000);
    worker.on("message", (result) => {
      console.log(`나는 ${i}번째 일꾼이고 내가 받은 결과는 ${result}야!!`);
    });
  }
};

start();
