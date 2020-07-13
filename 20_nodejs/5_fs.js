// 기본모듈
// fs : 파일 시스템을 다루기 위한 모듈
const fs = require("fs");

// 파일 읽기
// 동기식
try {
    const data = fs.readFileSync("hello.txt", "utf8");
    console.log(data);
} catch (exception) {
    console.error("Error:" + exception);
}
console.log("동기식 처리 완료");

// 비동기식
fs.readFile("hello.txt", "utf8", (err, data) => {
    
});
