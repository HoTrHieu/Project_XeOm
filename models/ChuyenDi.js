const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ChuyenDi = new Schema({
    SDTKhach: {type: String, required: true, trim: true},
    SDTTaiXe: {type: String, required: true, trim: true},
    DiaDiemDon: {type: String, required: true, trim: true},
    DiaDiemDi: {type: String, required: true, trim: true},
    SoKm: Number, 
    SoTien: Number,
    TinhTrang:{
        status: {type: String, required: true, trim: true },
        time: {type: Date, default: Date.now}
    }
})

const ModelChuyenDi= mongoose.model("ChuyenDi",ChuyenDi,"ChuyenDi")

module.exports = ModelChuyenDi