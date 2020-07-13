//웹서버
const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    const parsed = path.parse(req.url);
    console.log(parsed);
    const filename = parsed.base;

    //const imageFile = __dirname + path.sep + "images" + path.sep + filename; //C:\NodeProject\20_nodejs\images\cat.jpg
    const imageFile = '${__dirname}${path.sep}images${path.sep}${filename}'; //스읍.. 원래 되어야 하는데...

    fs.readFile(imageFile, (err,data) => {
        if(err){
            res.statusCode = 404;
            res.end("Not Found");
            return;
        }
        // text/plain, text/html, application/json, image/jpeg (형식들)
        res.writeHead(200, {"Content-Type": "image/jpeg"});
        res.end(data);
    });    
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});