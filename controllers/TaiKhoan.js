
//let models = require("../models");
let bcrypt = require("bcrypt");// mã hóa tài khoản
const passport = require("passport");// xác thực người dùng
//const myPassport = require('../passport_setup')(passport);
//let flash = require('connect-flash');
//const { isEmpty } = require('lodash');
//const { validateUser } = require('../validators/signup');
exports.show_login = function(req, res, next){
    res.render('index',  { title: 'Hiếu Đẹp Trai' });
}

exports.login = function(req, res, next){
    passport.authenticate('local',{
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);    
}