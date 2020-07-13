// 모듈 사용하기
const myCalc = require("./3_module");
const myCalc2 = require("./3_module2");

console.log(myCalc.calc.add(2, 3)); // exports/add = (a,b) => {}
console.log(myCalc.calc.sub(2, 3));

console.log(myCalc2.mul(2, 3)); // module.exports = calc{};
console.log(myCalc2.div(2, 3));

console.log(exports === module.exports);