const express = require('express');
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express();
const port = 3000;
// 바디파서 설정 : form으로 전달되는 메세지를 파싱해줌.
// true : qs(확장모듈), false : querystring (기본모듈)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// localhost:3000/music.html
app.use(express.static("public"));
//localhost:3000/static/music.html
//app.use("/static", express.static("public"));

app.use(logger("dev")); // tiny < dev < short < common < combind

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
// var express = require('express');
// var app = express();

// app.listen(3000, function() {
//     console.log('Server running at http://127.0.0.1:3000');
// });


app.get('/', function(req, res) {
    res.send(`<h1>Hello, Express</h1>`);
});

app.get('/hello', (req, res) => {
    console.log(req);
    // const name = req.query.name;
    const { name } = req.query; 
    res.send(`안녕하세요, ${name}님`); //음 왜 안되지..
});




// URL 파라미터 (REST API)
// 127.0.0.1:3000/music/아이유/좋은날
app.get("/music/:singer/:title", (req, res) => { 
    const { singer, title } = req.params;
    res.send(`${singer}의 ${title}입니다.`);
})

// POST 방식
// 1. form 전송 -> data를 꺼내는방법
// 2. URL 파라미터 -> req.params
// 3. HTTP Message = Header + Body
// GET 방식 : 데이터를 URL에 ? 뒤에 Query String을 통해 데이터 전송
//           Header부에 데이터 전송, 길이 제한 있음.
// POST 방식 : 데이터를 Body부에 전송, 길이 제한 없음, 캐싱이 안됨
// 

app.post("/music", (req,res) => {
    const { singer, title } = req.body;
    res.send(`urlencoded(post) -> ${singer}의 ${title}입니다.`);
});

// URL 파라미터 전송 (RESTFul API)
// localhost:3000/music/아이유/좋은날
app.post("/music/:singer/:title", (req, res) => {
    const { singer, title } = req.params;
    res.send(`url parameter(post) -> ${singer}의 ${title}입니다`);
});
// PUT : localhost:3000/music/{id}
// { singer: "아이유", title: "에잇"}
// 결과 : {id} -> 아이유의 에잇으로 수정됨
// form url encoded
app.put("/music/:id", (req, res) => {
    const { id } = req.params; 
    const { singer, title } = req.body;
    res.send(`${id} -> ${singer}의 ${title}로 수정됨`);
});

// 여기까지 내려왔다는 것은 위에서 처리가 되지 않은 것
app.use((req, res, next) => {
    const error = new Error("없는 페이지입니다.");
    error.code = 404;
    next(error);
    //throw new Error("없는 페이지입니다.");
});

//오류처리 미들웨어
app.use((err, req, res, next) => {
    if (err.code) res.status(err.code);
    else res.status(500);
    if (err.message) res.send(err.message);
    else res.send("Internal Server Error");
});

// RESTFul API
// 1. HTPP 요청 : 모든 자원은 명사로 작성
// 예) GET /users, GET /users/{id}
// test.com/users [GET] : 사용자 목록조회, /users/{id} 상세조회
// test.com/users [POST] : 사용자 생성
// test.com/users/{id} [PUT] : 사용자 변경
// test.com.users/{id} [DELETE] : 사용자 삭제

// (bad case)
// test.com/users/create
