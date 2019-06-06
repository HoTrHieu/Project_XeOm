const TaiKhoan = require('../models/TaiKhoan')
const Router = require('express').Router
const router = new Router()
const controller = require("../controllers/ChuyenDi")


router.post('/add', controller.AddChuyenDi )
router.get('/', controller.AddChuyenDi)
router.get('/:id', controller.getIdChuyenDi)
router.get('/delete/:id' , controller.Delete)

router.post('/update/:id', controller.Update)

module.exports = router




