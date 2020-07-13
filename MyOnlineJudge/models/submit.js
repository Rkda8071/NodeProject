const mongoose = require("mongoose");

//스키마 생성
const SubmitSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true,
    },
    problemId: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,  
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

// 스키를 통해서 모델 객체 생성
// mongoose.model("모델명", "스키마") -> 모델명s
// mongoose.model("모델명", "스키마", "컬렉션명")
module.exports = mongoose.model("submit", SubmitSchema);