
//let models = require("../models");
let bcrypt = require("bcrypt");// mã hóa tài khoản
const passport = require("passport");// xác thực người dùng
//const myPassport = require('../passport_setup')(passport);
//let flash = require('connect-flash');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
//const { validateUser } = require('../validators/signup');
const ModelTaiKhoan = require('../../../models/TaiKhoan');
const ModelTaiXe = require('../../../models/TaiXe');

process.env.SECRET_KEY = "secret";

exports.show_login = function(req, res, next){
    res.render('index',  { title: 'Hiếu Đẹp Trai' });
}

exports.register = function(req, res,next){    
    ModelTaiKhoan.findOne({
        UserName: req.body.SoDienThoai
    }).exec(function(err, taikhoan){
        if(taikhoan){
            return res.json({error: 'exists'})
        }else if(!taikhoan){
            bcrypt.hash(req.body.PassWord, 10, function(err, hash){
                if (err) {return next(err);}
                const taiKhoanData ={
                    UserName: req.body.SoDienThoai,
                    PassWord: req.body.PassWord,
                    TinhTrang: req.body.TinhTrang,
                    LoaiTaiKhoan: req.body.LoaiTaiKhoan
                }
                const taiXeData = {
                    HoTen: req.body.HoTen,
                    SoDienThoai: req.body.SoDienThoai,
                    DiaChi: req.body.DiaChi,
                    BienSoXe: req.body.BienSoXe,
                    AnhDaiDien: req.body.AnhDaiDien,
                    AnhXe: req.body.AnhXe
                }
                taiKhoanData.PassWord = hash;
                const taikhoan = new ModelTaiKhoan(taiKhoanData)
                const taixe = new ModelTaiXe(taiXeData)
                taikhoan.save((err, result) => {
                    if(err) {return res.json({err})}
                    taixe.save((err, result)=>{
                        if(err) {return res.json({err})}
                        res.json({taiKhoanData, taiXeData: result})
                    })
                })
            })
        }
    })
}

exports.login = function(req, res){
    ModelTaiKhoan.findOne({
        UserName: req.body.UserName
    }).exec(function(err, taikhoan){
        if(err){
            return res.json({err})
        }else if(!taikhoan){
            return res.json({err: 'incorrect'})
        }else if(taikhoan.TinhTrang !== 'KichHoat' ){
            return res.json({err: 'notactivated'})
        }
        if(bcrypt.compareSync(req.body.PassWord, taikhoan.PassWord)){
            const payload = {
                _id: taikhoan.id,
                UserName : taikhoan.UserName,
                LoaiTaiKhoan: taikhoan.LoaiTaiKhoan
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY,{
                expiresIn: 1440,
            },(err, token)=>{
                if(payload.LoaiTaiKhoan === 'admin'){
                    res.json({user: token, 'role': 'admin'})
                }else{
                    res.json({user: token,'role': 'taixe'})
                }
            })
                
            }else{
            res.json({err: 'incorrect'})
        }
    })
}

exports.logout = function(req,res){
    if(req.session){
        // delete session object
        req.session.destroy((err)=>{
            if(err){
                return res.json({err})
            }else{
                return res.json({'logout': 'success'})
            }
        })
    }
}
/* exports.login = function(req, res, next){
    passport.authenticate('local',{
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);    
} */