// 4. 함수

// 첫번째 방식
function add(a, b) {
    return a + b;
};
console.log(add(2, 3));

// 두번째 방식 (익명함수)
var add2 = function(a, b){
    return a+b;
};
console.log(add2(2, 3));

// 세번쨰 방식
var add3 = (function (a, b) {
    return a + b;
})(2, 3);
console.log(add3);

// 네번째 방식
var add4 = (a, b) => a + b;
console.log(add4(2,3));

var add5 = ((a, b) => a + b)(2, 3);
console.log(add5);