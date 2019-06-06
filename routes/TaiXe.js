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


router.get('/getbydate/:time', controller.GetByDate)

router.get('/getbymonth/:time', controller.GetByMonth)

router.get('/getbyweek/:time', controller.GetByWeek)

router.get('/getbyphone/:phone', controller.GetByPhone)

module.exports = router;
