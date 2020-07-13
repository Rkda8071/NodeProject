var a = 1;
var b = 2;
console.log(a, b);
console.log("%d %d", a, b);

//type of 
// number 타입, string 타입
//변수 호이스팅(hoisting)
function foo(){
    //var a; 안써도 함수 올려짐 = 호이스팅
    console.log(a); //undefined
    var a = 10;
    console.log(a); //10
}

foo();

// var : 함수 레벨 스코프, let : 블록 레벨 스코프 
// var를 함수안에서 쓰면 함수 맨위로 올라옴, let : c언어랑 똑같음 함수 안에서만 쓸 수 있다
function foo2() {
    if (true) {
        var tmp = 10;
        console.log("1:" + tmp);
    }
    console.log("2:" + tmp);
}
foo2();

const PI = 3.14;
