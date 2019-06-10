const mongoose = require("mongoose")

const Schema = mongoose.Schema

const TaiXe = new Schema({
    HoTen:  {type: String,  required: true, trim: true},
    SoDienThoai: {type: String, unique: true, required: true, trim: true},
    DiaChi: {type: String, required: true, trim: true},
    BienSoXe: {type: String,  required: true, trim: true},
    AnhDaiDien: {type: String,  required: true, trim: true},
    AnhXe: {type:  [String] ,  required: true, trim: true},
    HoatDong:{type: String, enum: ['Online','Offline']},
    ToaDoHienTai:{
        lat: {type: Number, required: true, trim: true },
        lng: {type: Number, required: true, trim: true}
    }
})

const ModelTaiXe= mongoose.model("TaiXe",TaiXe, "TaiXe")

module.exports = ModelTaiXe 