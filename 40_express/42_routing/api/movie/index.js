// 라우팅 모듈 작성
const express = require("express");
const router = express.Router();
const ctrl = require("./movie.ctrl");

router.get("/", ctrl.list); // 목록조회 
//localhost:3000/api/movie?limit=2
router.get("/:id", ctrl.detail); // 상세조회
//localhost:3000/api/movie/2
router.post("/", ctrl.create); // 등록 
// localhost:3000/api/movie?title=sadfd&director=asdf&year=2000
router.put("/:id", ctrl.update); // 수정
// localhost:3000/api/movie/1?title=sadfd&director=asdf&year=2000
router.delete("/:id", ctrl.remove); // 삭제
// localhost:3000/api/movie/2
module.exports = router;