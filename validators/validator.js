const ModelTaiKhoan = require('../models/TaiKhoan')
const ModelTaiXe  = require('../models/TaiXe');

exports.UserValidator = function(req, res, next){
    //name
    req.check('HoTen', 'ErrorHoTen').notEmpty();
    req.check('SoDienThoai', 'ErrorSoDienThoai').notEmpty();
    req.check('DiaChi', 'ErrorDiaChi').notEmpty();
    req.check('BienSoXe', 'ErrorBienSoXe').notEmpty();
    /* req.check('AnhDaiDien', 'ErrorAnhDaiDien').notEmpty();
    req.check('AnhXe', 'ErrorAnhXe').notEmpty(); */
    req.check('UserName', 'ErrorUserName').notEmpty();
    req.check('PassWord', 'ErrorPassWord').notEmpty();
    req.check('PassWord', 'LengthPassWord').isLength({min:6});
    /* req.check('PassWordConfirm', 'ErrorPassWordConfirm').notEmpty(); */
    /* req.check('PassWordConfirm','PasswordMismatch').equals(req.body.PassWord); */

    //check for errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.json({error: firstError});
    }
    next();
}

exports.LoginValidator = function(req, res, next){
    //name
    req.check('UserName', 'ErrorUserName').notEmpty();
    req.check('PassWord', 'ErrorPassWord').notEmpty();

    //check for errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.json({error: firstError});
    }
    next();
}

