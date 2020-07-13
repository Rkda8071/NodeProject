const MusicModel = require("../../models/music");
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
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10);
    if (Number.isNaN(limit)) return res.status(400).end(); // 숫자가 아닌경우
    //res.json(music.slice(0, limit));
    MusicModel.find((err, result) => {
        if (err) return res.status(500).end();
        //res.json(result);
        res.render("music/list", { result });
    }).limit(limit).sort({ _id: -1 });

};
// 상세조회 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 music 객체 리턴 (200 : OK)
// - 실패 : 유효한 id가 아닌 경우 (400 : Bad Request)
//          해당하는 id가 없는 경우 (404 : Not Found)
const detail = (req, res) => {
    const id = req.params.id;

    // 유효한 id인지를 체크

    // id로 조회
    MusicModel.findById(id, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        //res.json(result);
        res.render("music/detail", { result });
    });
};
// 등록 POST localhost:3000/api.music
// - 성공 : 입력된 singer, title값으로 객체를 만들고 db추가
//          배열 추가(201 : Created)
// - 실패 : singer, title 값 누락시 (400 : Bad Request)
const create = (req, res) => {
    const { singer, title} = req.body;
    if(!singer || !title) return res.status(400).end();

    // 1. Model -> Document
    /*const music = new MusicModel( {singer,title} );
    music.save((err, result) => {
        if (err) return res.status(500).end();
        res.status(201).json(result);
    });*/

    // 2. Model.create()
    MusicModel.create({ singer, title }, (err, result) => {
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

    
    const { singer, title } = req.body;
    // 2.id에 해당하는 Document에 입력 받은 data로 update
    MusicModel.findByIdAndUpdate(id, { singer, title }, { new: true },
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
    MusicModel.findByIdAndRemove(id, (err, result) => {
        if (err) return res.status(500).send("삭제 시 오류가 발생했습니다");
        if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
        res.json(result);
    });
};

const showCreatePage = (req, res) => {
    console.log("나옴?");
    res.render("music/create");
};

const showUpdatePage = (req, res) => {
    const id = req.params.id;
    MusicModel.findById(id, (err, result) => {
        if (err) return res.status(500).end().send("수정 시 오류가 발생했습니다.");
        if (!result) return res.status(404).end().send("해당하는 정보가 없습니다.");
        res.render("music/update", { result });
    });
};

module.exports = { list, detail, create, update, remove, checkId, showCreatePage, showUpdatePage};