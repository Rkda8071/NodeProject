// 기본모듈 = url (URL을 처리하는 모듈)

const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // string -> object
    const parsed = url.parse(req.url, true);
    console.log(parsed.query.year);
    console.log(parsed.query.class);
    console.log(parsed.query.name);

    const y = parsed.query.year;
    const c = parsed.query.class;
    const n = parsed.query.name;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  //3학년 3반 윤준성입니다.
  res.end(y+ "학년 " + c + "반 " + n + "입니다. 안녕~~");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});