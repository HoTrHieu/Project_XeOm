const TaiKhoan = require('../models/TaiKhoan')
const Router = require('express').Router
const router = new Router()
const controller = require("../controllers/ChuyenDi")


router.post('/add', controller.AddChuyenDi )
router.get('/', controller.GetAllChuyenDi)
router.get('/:id', controller.getIdChuyenDi)
router.get('/delete/:id' , controller.Delete)

router.post('/update/:id', controller.Update)
router.post("/updateTinhTrang/:id",controller.UpdateTinhTrang)
module.exports = router




