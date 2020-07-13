// 라우팅 모듈 작성
const express = require("express");
const router = express.Router();
const ctrl = require("./example.ctrl");

//router.get("/", ctrl.list); // 목록조회 
router.get("/new", ctrl.showCreatePage); // 등록페이지 보여줌
router.get("/:id", ctrl.checkId, ctrl.detail); // 상세조회
router.get("/:id/edit", ctrl.checkId, ctrl.showUpdatePage);

router.post("/", ctrl.create); // 등록 
router.put("/:id", ctrl.checkId, ctrl.update); // 수정
router.delete("/:id", ctrl.checkId, ctrl.remove); // 삭제

module.exports = router;
