var express = require('express');
var router = express.Router();
const TaiXe = require('../models/TaiXe')
/* GET users listing. */
const controller = require("../controllers/TaiXe")
router.get('/:id', controller.GetSoDienThoai )
router.post('/add', controller.Add)
router.get('/', controller.Select)
 
router.get('/delete/:id', controller.Delete)

router.post('/update/:id',  controller.Update)

 

module.exports = router;
