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

// 라우팅 모듈 설정
// localhost:3000/api/music
app.use("/api", require("./api")); // ./api/index (index 생략 가능)

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
