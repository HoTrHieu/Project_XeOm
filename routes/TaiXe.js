var express = require('express');
var router = express.Router();
const TaiXe = require('../models/TaiXe')
const ChuyenDi = require('../models/ChuyenDi');
/* GET users listing. */
const controller = require("../controllers/TaiXe")
router.get('/:id', controller.GetSoDienThoai )
router.post('/add', controller.Add)
router.get('/', controller.Select)
 
router.get('/delete/:id', controller.Delete)

router.post('/update/:id',  controller.Update)


router.get('/getdata/:time', controller.GetData)

router.get('/getgroupbyphone/:type/:time', controller.GetGroupByPhone)

router.get('/getbyphone/:id/:type/:time', controller.GetByPhone)

router.post('/updateHoatDong/:id',controller.UpdateHoatDong)

router.get('/text-api', controller.text)

router.post("/upload", controller.Upload)

router.post("/uploadsingle",controller.UploadSingle)

module.exports = router;
