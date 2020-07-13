const SubmitModel = require("../../models/submit");
const mongoose = require("mongoose");

// id 유효성 체크
const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    next();
};
// 목록조회 (localhost:3000/api/music?limit=2)
// - 성공 :
// - 실패 : limit가 숫자가 아닌 경우 (400: Bad Request)
// list에서만 pid 사용하기
const list = (req, res) => {
    const user = res.locals.user.email;
    
    SubmitModel.find({ user }, (err, result) => {
        if (err) return res.status(500).end();
        res.render("submit/list", { result });
    }).sort({ _id: -1 });
};
// 상세조회 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 music 객체 리턴 (200 : OK)
// - 실패 : 유효한 id가 아닌 경우 (400 : Bad Request)
//          해당하는 id가 없는 경우 (404 : Not Found)
const detail = (req, res) => {
    const id = req.params.id;
    SubmitModel.findById(id, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.render("submit/detail", { result });
    });
};
// 등록 POST localhost:3000/api.music
// - 성공 : 입력된 singer, title값으로 객체를 만들고 db추가
//          배열 추가(201 : Created)
// - 실패 : singer, title 값 누락시 (400 : Bad Request)
const create = (req, res) => {
    //const pid = req.params.pid;
    const { problemId, code } = req.body;
    const user = res.locals.user.email;
    console.log(user);
    console.log(problemId);
    console.log(code);  
    
    if(!problemId || !code || !user) return res.status(400).end();
    SubmitModel.create({ user, problemId, code }, (err, result) => {
        if (err) res.status(500).end();
        res.status(201).json(result);
    });
};
// 수정 (PUT localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 객체의 값을 변경 후 리턴 (200:OK)
// - 실패 : id가 숫자가 아닌 경우 (400: Bad Request)
//          해당한느 id가 없는 경우 (404 : Not Found)

const update = (req, res) => {
    const id = req.params.id;
    
    const { problemId, code } = req.body;
    // 2.id에 해당하는 Document에 입력 받은 data로 update
    SubmitModel.findByIdAndUpdate(id, { problemId, code }, { new: true },
        (err, result) => {
            if (err) return res.status(500).end();
            if (!result) return res.status(404).end();
            res.json(result);
        });
};
// 삭제 (DELETE localhost:3000/api/music/:id)
// - 성공 : id에 해당한느 객체를 배열에서 삭제 후 배열 리턴 (200:OK)
// - 실패 : id가 숫자가 아닌 경우 (400:Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const remove = (req, res) => {
    const id = req.params.id;
    // 2. 해당하는 id document를 DB에서 삭제
    SubmitModel.findByIdAndRemove(id, (err, result) => {
        if (err) return res.status(500).send("삭제 시 오류가 발생했습니다");
        if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
        res.json(result);
    });
};

const showCreatePage = (req, res) => {
    const ProblemModel = require("../../models/problem");
    ProblemModel.find( (err, result) => {
        if (err) return res.status(500).end();
        res.render("submit/create", { result });
    }).sort({ _id: -1 });};

const showUpdatePage = (req, res) => {
    const id = req.params.id;
    SubmitModel.findById(id, (err, result) => {
        if (err) return res.status(500).end().send("수정 시 오류가 발생했습니다.");
        if (!result) return res.status(404).end().send("해당하는 정보가 없습니다.");
        res.render("submit/update", { result });
    });
};

module.exports = { list, detail, create, update, remove, checkId, showCreatePage, showUpdatePage};