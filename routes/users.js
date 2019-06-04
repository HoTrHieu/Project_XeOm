var express = require('express');
var router = express.Router();

const {register, login, logout} = require('../controllers/TaiKhoan');
const {UserValidator, LoginValidator} = require('../validators/validator');


router.post('/register', UserValidator, register)

/* POST Login */
router.post('/login', LoginValidator, login);

/* GET Logout */
router.get('/logout', logout);

module.exports = router;
