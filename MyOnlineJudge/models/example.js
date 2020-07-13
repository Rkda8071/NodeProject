const mongoose = require("mongoose");

//스키마 생성
const ExampleSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: true,
    },
    input: {
        type: String,
    },
    output: {
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
module.exports = mongoose.model("example", ExampleSchema);