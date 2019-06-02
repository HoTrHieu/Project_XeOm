var express = require('express');
var router = express.Router();
const TaiXe = require('../models/TaiKhoan')
/* GET users listing. */

router.post('/add', async (req,res)=>{ //
    const {UserName,PassWord,LoaiTaiKhoan,TinhTrang} = req.body

    const taikhoan = new TaiKhoan({UserName,PassWord,LoaiTaiKhoan,TinhTrang})
    const new_TaiKhoan= await taikhoan.save()
    res.json({
        new_TaiKhoan
    })
})
router.get('/', async (req, res)=>{ //select * 
    
    const taikhoan = await TaiKhoan.find({})
    res.json({
        taikhoan
     })
    //res.render('view', {TaiKhoan})
})
router.get('/:id', async (req, res)=>{ //select theo id
      const {id} = req.params
      const taikhoan = await TaiKhoan.findById(id)
      res.json({
        taikhoan
      })
   // res.render('update', {TaiKhoan})
})
router.get('/delete/:id',async (req, res)=>{ //
        const {id} = req.params
        const taikhoan = await TaiKhoan.findOneAndRemove({_id: id})
       res.json({
             taikhoan
       })
})

router.post('/update/:id', async (req, res)=>{
    const {id} = req.params
    const {UserName,PassWord,LoaiTaiKhoan,TinhTrang} = req.query
    console.log(UserName)
    const taikhoan = await TaiKhoan.findByIdAndUpdate(id, {UserName,PassWord,LoaiTaiKhoan,TinhTrang}, {new: true})
    res.json({
        taikhoan
  })
    //res.redirect('/TaiKhoan')
})
module.exports = router;
