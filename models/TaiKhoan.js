const mongoose = require("mongoose")
//var mongooseUniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const TaiKhoan = new Schema({
    UserName: {type: String, unique: true, required: true },
    PassWord:{type: String, required: true, trim: true, minlength: 6},
    LoaiTaiKhoan: {type: String, enum: ['admin', 'TaiXe']},
    TinhTrang:{type: String, enum: ['ChuaKichHoat','KichHoat','Khoa']}
})

//TaiKhoan.plugin(mongooseUniqueValidator);
const ModelTaiKhoan= mongoose.model("TaiKhoan",TaiKhoan,"TaiKhoan")

module.exports = ModelTaiKhoan