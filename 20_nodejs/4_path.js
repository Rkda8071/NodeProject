// 4. 기본모듈 vs 확장모듈
// path : 파일 경로를 다루는 모듈

const path = require("path");

console.log(__dirname);
console.log(__filename);

//path.parse();
const parsed = path.parse(__filename);
console.log(parsed);

console.log(parsed.dir);
console.log(parsed.base);