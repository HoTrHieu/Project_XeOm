
const TaiKhoan = require('../models/TaiKhoan')
const Router = require('express').Router
const router = new Router()


router.post('/add', async (req,res)=>{ //
    const {SDTKhach,SDTTaiXe,DiaDiemDon,DiaDiemDi,SoKm,SoTien,TinhTrang} = req.body
    const chuyendi = new ChuyenDi({SDTKhach,SDTTaiXe,DiaDiemDon,DiaDiemDi,SoKm,SoTien,TinhTrang})
    const new_chuyendi= await chuyendi.save()
    res.json({
        new_chuyendi
    })
})
router.get('/', async (req, res)=>{ 
    
    const chuyendi = await ChuyenDi.find({})
    res.json({
        chuyendi
     })
})
router.get('/:id', async (req, res)=>{ //select theo id
      const {id} = req.params
      const chuyendi = await ChuyenDi.findById(id)
      res.json({
        chuyendi
      })
})
router.get('/delete/:id',async (req, res)=>{ 
        const {id} = req.params
        const  chuyendi = await ChuyenDi.findOneAndRemove({_id: id})
       res.json({
        chuyendi
       })
})

router.post('/update/:id', async (req, res)=>{
    const {id} = req.params
    const{SDTKhach,SDTTaiXe,DiaDiemDon,DiaDiemDi,SoKm,SoTien,TinhTrang} = req.query
    console.log(UserName)
    const  chuyendi = await ChuyenDi.findByIdAndUpdate(id,{SDTKhach,SDTTaiXe,DiaDiemDon,DiaDiemDi,SoKm,SoTien,TinhTrang}, {new: true})
    res.json({
        chuyendi
  })  
})

module.exports = router




