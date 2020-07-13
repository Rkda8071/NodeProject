// 라우팅 모듈 작성
const express = require("express");
const router = express.Router();
const ctrl = require("./user_ctrl");


router.get("/logout", ctrl.logout);
router.get("/signup", ctrl.showSignupPage); // 회원가입 페이지 보여주기
router.get("/login", ctrl.showLoginPage); // 로그인 페이지 보여주기
router.post("/signup", ctrl.signup); // 회원가입
router.post("/login", ctrl.login);
module.exports = router;