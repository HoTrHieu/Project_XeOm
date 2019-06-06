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

 

router.get('/api/taixe-chuyendi-date/:time', async (req, res)=>{
    const taixes = await TaiXe.find()
    const chuyendis = await ChuyenDi.find()
    let Similarphone = []
    chuyendis.map(chuyendi=>{
        taixes.map(taixe=>{
            let time = new Date(chuyendi.TinhTrang['time']).toJSON()
            .slice(0, 10)
            .replace(/[-T:]/g, "");
            /* time = time.slice(4,15);
            time= time.replace(/\s/g, '') */
            if(taixe.SoDienThoai == chuyendi.SDTTaiXe && time === req.params.time){
                Similarphone.push({SimilarPhone:{chuyendi, taixe, time}})
            }
        })
    })
    res.json({
        Similarphone
    })
})

router.get('/api/taixe-chuyendi-month/:time', async (req, res)=>{
    const taixes = await TaiXe.find()
    const chuyendis = await ChuyenDi.find()
    let Similarphone = []
    chuyendis.map(chuyendi=>{
        taixes.map(taixe=>{
            let time = new Date(chuyendi.TinhTrang['time']).toJSON()
            .slice(0, 8)
            .replace(/[-T:]/g, "");
            /* time = time.slice(4,15);
            time= time.replace(/\s/g, '') */
            if(taixe.SoDienThoai == chuyendi.SDTTaiXe && time === req.params.time){
                Similarphone.push({SimilarPhone:{chuyendi, taixe, time}})
            }
        })
    })
    res.json({
        Similarphone
    })
})

router.get('/api/taixe-chuyendi-week/:time', async (req, res)=>{
    const taixes = await TaiXe.find()
    const chuyendis = await ChuyenDi.find()
    let Similarphone = []
    2019063
    let paramsTime = req.params.time + '';
    let year = paramsTime.substr(0,4);
    let month = paramsTime.substr(4,2);
    let week = paramsTime.substr(paramsTime.length-1);
    dataWeek = []
    switch(week){
        case 1: 
        {
            for(var i = 1; i<= 7; i++){
                dataWeek.push('01')
            }
            break;
        }
        case 2:{
            for(var i = 8; i<= 14; i++){
                dataWeek.push('02')
            }
            break;
        }
        case 3:{
            for(var i = 15; i<= 21; i++){
                dataWeek.push('03')
            }
            break;
        }
        case 4:{
            for(var i = 22; i<= 28; i++){
                dataWeek.push('04')
            }
            break;
        }
        case 5:{
            for(var i = 29; i<= 31; i++){
                dataWeek.push('05')
            }
            break;
        }
    }
    dataWeek.map((data)=>{
        console.log(data)
    })
    chuyendis.map(chuyendi=>{
        taixes.map(taixe=>{
            let time = new Date(chuyendi.TinhTrang['time']).toJSON()
            .slice(0, 8)
            .replace(/[-T:]/g, "");
            /* time = time.slice(4,15);
            time= time.replace(/\s/g, '') */
            if(taixe.SoDienThoai == chuyendi.SDTTaiXe && time === req.params.time){
                Similarphone.push({SimilarPhone:{chuyendi, taixe, time}})
            }
        })
    })
    res.json({
        Similarphone
    })
})

module.exports = router;
