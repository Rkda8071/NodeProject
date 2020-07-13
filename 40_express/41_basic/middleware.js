// 애플리케이션 vs 미들웨어
// 애플리케이션 : 뼈대
// 미들웨어 : 뼈대에 들어갈 필요한 기능
const express = require("express");
const moment = require("moment");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// 미들웨어 함수 작성
const mw1 = (req, res, next) => {
    console.log("첫번째 미들웨어");
    next();
};
const mw2 = (req, res, next) => {
    console.log("두번째 미들웨어");
    next();
};
const logger = (req, rex, next) => {
    //const method = req.method;
    //const url = req.url;
    const { method, url } = req;
    const time = moment().format("YYYY-MM-DD HH:mm:ss:SSS");
    console.log(`${method} - ${url} - ${time}`);
    next();
}
app.use(mw1);
app.use(mw2);
app.use(logger);

app.get("/", (req, res) => {
    res.send(`내일 잘 올라오세요~`);
});