// Node.js란?
// 웹 어플리케이션 = 프론트엔드(화면) + 백엔드(서버)
// 화면 : HTML + CSS + Javascript

// 1. 크롬 V8 엔진 : 브라우저 밖으로 나옴
// 2. 이벤트 기반의 비동기 i/O 프레임워크
// 3. 모듈 시스템 기반 : 파일 형태로 구분 (CommonJS 표준 스택)

// REPL
// 콘솔에 출력
// 웹서버를 띄워 출력
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
//ㅗㅗㅗㅗㅗㅗㅗㅗ
// 요청(request), 응답(response)
// Header + Body
// 1. 127.0.0.1:3000 -> text/plain 'Hello World'
// 2. 127.0.0.1:3000/html -> <h1>Hello World<h1>
// 3. 127.0.0.1:3000/json ->  {msg : Hello, World}

const server = http.createServer((req, res) => {
  console.log(req.url); // /
  if(req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
  } else if (req.url === "/html") {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<body><h1>Hello, World</h1></body>");
    res.write("</html>");
    res.end();
  } else if(req.url === "/json" ){
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
  } else {
      /*const data = { msg: "Not Found" };
      res.statusCode = 404;
      res.setHeader("Content-Type", "")
      res.end(JSON.stringify)*/
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});