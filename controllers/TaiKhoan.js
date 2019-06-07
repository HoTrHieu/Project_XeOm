
//let models = require("../models");
let bcrypt = require("bcrypt");// mã hóa tài khoản
const passport = require("passport");// xác thực người dùng
//const myPassport = require('../passport_setup')(passport);
//let flash = require('connect-flash');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
//const { validateUser } = require('../validators/signup');
const ModelTaiKhoan = require('../models/TaiKhoan');
const ModelTaiXe = require('../models/TaiXe');

process.env.SECRET_KEY = "secret";
const TaiXe = require('../models/TaiXe')
const TaiKhoan = require('../models/TaiKhoan')


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
                    AnhXe: req.body.AnhXe,
                    HoatDong: "Offline"
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

module.exports.APITaiXe_TaiKhoan = async (req, res)=>{ //API TaiXe TaiKhoan
    const taixes = await TaiXe.find()
    const taikhoans = await TaiKhoan.find()
    let Similarphone = []
    taixes.map(taixe=>{
        taikhoans.map(taikhoan=>{
            if(taixe.SoDienThoai == taikhoan.UserName){
                   
                Similarphone.push({SimilarPhone:{taixe, taikhoan}})
            }
        })
    })
    res.json({
        Similarphone
    })
   
}
module.exports.Add = async (req,res)=>{ //add
const {UserName,PassWord,LoaiTaiKhoan,TinhTrang} = req.body

const taikhoan = new TaiKhoan({UserName,PassWord,LoaiTaiKhoan,TinhTrang})
const new_TaiKhoan= await taikhoan.save()
res.json({
    new_TaiKhoan
})
}
module.exports.Select = async (req, res)=>{ //select * 

const taikhoan = await TaiKhoan.find({})
res.json({
    taikhoan
 })
//res.render('view', {TaiKhoan})
}
module.exports.FetchID = async (req, res)=>{ //select theo id
  const {id} = req.params
  const taikhoan = await TaiKhoan.findById(id)
  res.json({
    taikhoan
  })
// res.render('update', {TaiKhoan})
}
module.exports.Delete =  async (req, res)=>{ //delete
    const {id} = req.params
    const taikhoan = await TaiKhoan.findOneAndRemove({_id: id})
   res.json({
         taikhoan
   })
}

module.exports.Update = async (req, res)=>{ //update
const {id} = req.params
const {TinhTrang} = req.body

console.log(TinhTrang)

const taikhoan = await TaiKhoan.findOneAndUpdate({_id:id}, {TinhTrang}, {new: true})
res.json({
    taikhoan
})
//res.redirect('/TaiKhoan')
}