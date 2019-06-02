var express = require('express');
var router = express.Router();
const TaiXe = require('../models/TaiXe')
/* GET users listing. */

router.get('/:id', async (req, res)=>{ 
    
    const SoDienThoai = req.params.id
    console.log(SoDienThoai)
    await  TaiXe.findOne({ SoDienThoai }).then(taixe=>{
         res.json({taixe})
    })
//    await TaiXe.findOne({
//         SoDienThoai
//     }).exec(function(err, taiXe){
//         if(taiXe){
//             return res.json({taiXe: taiXe})
//         }else if(!taiXe){
//             return res.json({err: err})
//         }
//     })

     /* const taiXe = await TaiXe.findOne({ SoDienThoai: SoDienThoai }).then(
       (res )=>{
        res.json({
            taiXe
         })
       } 
    )  */
    }
   
)
router.post('/add', async (req,res)=>{ //
    const {HoTen,SoDienThoai,DiaChi,BienSoXe,AnhDaiDien,AnhXe} = req.body

    const taixe = new TaiXe({HoTen,SoDienThoai,DiaChi,BienSoXe,AnhDaiDien,AnhXe})
    const new_Taixe= await taixe.save()
    res.json({
        new_Taixe
    })
})
router.get('/', async (req, res)=>{ 
    
    const taixe = await TaiXe.find({})
    res.json({
        taixe
     })
})

// router.get('/:id', async (req, res)=>{ //select theo id
//       const {id} = req.params
//       const taixe = await TaiXe.findById(id)
//       res.json({
//         taixe
//       })
// })
router.get('/delete/:id',async (req, res)=>{ 
        const {id} = req.params
        const  taixe = await TaiXe.findOneAndRemove({_id: id})
       res.json({
            taixe
       })
})

router.post('/update/:id', async (req, res)=>{
    const {id} = req.params
    const {HoTen,SoDienThoai,DiaChi,BienSoXe,AnhDaiDien,AnhXe} = req.query
    console.log(UserName)
    const  taixe = await TaiXe.findByIdAndUpdate(id, {HoTen,SoDienThoai,DiaChi,BienSoXe,AnhDaiDien,AnhXe}, {new: true})
    res.json({
        taixe
  })  
})

module.exports = router;
