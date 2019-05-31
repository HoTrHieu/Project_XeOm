var express = require('express');
var router = express.Router();
const {register, login, logout} = require('../client/src/controllers/TaiKhoan');
const {UserValidator, LoginValidator} = require('../validators/validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST Register */
router.post('/register', UserValidator, register)

/* POST Login */
requiresLogout = (req, res, next)=>{
  if(req.session && req.session.taikhoan){
    return res.json({err: 'Bạn phải đăng xuất để tiếp tục đăng nhập'})
  }else{
    return next();
  }
}

router.post('/login', requiresLogout, LoginValidator, login);

/* GET Logout */
requiresLogin = (req, res, next)=>{
  if(req.session && req.session.taikhoan){
    return next();
  }else{
    return res.json({err: 'Bạn phải đăng nhập mới xem được trang'})
  }
}
router.get('/logout', requiresLogin, logout);

module.exports = router;
