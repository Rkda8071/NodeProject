const mongoose = require("mongoose");

//스키마 생성
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: Number,
        default: 0 // 0: 일반사용자 , 1: 관리자 등등...
    },
    token: {
        type: String,
    },
});

// 스키를 통해서 모델 객체 생성
// mongoose.model("모델명", "스키마") -> 모델명s
// mongoose.model("모델명", "스키마", "컬렉션명")
module.exports = mongoose.model("user", UserSchema);