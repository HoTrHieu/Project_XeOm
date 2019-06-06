var express = require('express');
var router = express.Router();
const TaiXe = require('../models/TaiXe')
const TaiKhoan = require('../models/TaiKhoan')
const controller = require("../controllers/TaiKhoan")

/* GET users listing. */
//get TaiXe voi TaiKhaon

router.get('/api/taixe-taikhoan', controller.APITaiXe_TaiKhoan)
router.post('/add', controller.Add )
router.get('/', controller.Select)
router.get('/:id', controller.FetchID)
router.get('/delete/:id', controller.Delete)

router.post('/update/:id', controller.Update)
module.exports = router;
