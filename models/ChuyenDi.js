const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ChuyenDi = new Schema({
    SDTKhach: {type: String, required: true, trim: true},
    SDTTaiXe: {type: String, required: true, trim: true},
    DiaDiemDon: {
        addressname:{type: String, required: true, trim: true},
        lat:String,
        lng:String
    },
    DiaDiemDi: {
        addressname:{type: String, required: true, trim: true},
        lat:String,
        lng:String
    },
    SoKm: Number, 
    SoTien: Number,
    TinhTrang:{
        status: {type: String, enum: ['NhanKhach', 'TuChoi','HoanThanh']},
        time: {type: Date, default: Date.now}
    }
})

const ModelChuyenDi= mongoose.model("ChuyenDi",ChuyenDi)

module.exports = ModelChuyenDi