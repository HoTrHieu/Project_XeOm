
const TaiXe = require('../models/TaiXe')
module.exports.GetSoDienThoai =  async (req, res)=>{  //getSoDenThoai
    
    const SoDienThoai = req.params.id
    console.log(SoDienThoai)
    await  TaiXe.findOne({ SoDienThoai }).then(taixe=>{
         res.json({taixe})
    })
 
    }
   

module.exports.Add =  async (req,res)=>{ //Add
    const {HoTen,SoDienThoai,DiaChi,BienSoXe,AnhDaiDien,AnhXe} = req.body

    const taixe = new TaiXe({HoTen,SoDienThoai,DiaChi,BienSoXe,AnhDaiDien,AnhXe})
    const new_Taixe= await taixe.save()
    res.json({
        new_Taixe
    })
}
module.exports.Select =  async (req, res)=>{  //Select
    
    const taixe = await TaiXe.find({})
    res.json({
        taixe
     })
}

 
 
module.exports.Delete = async (req, res)=>{  //delete
        const {id} = req.params
        const  taixe = await TaiXe.findOneAndRemove({_id: id})
       res.json({
            taixe
       })
}

 
module.exports.Update = async (req, res)=>{//Update
    const {id} = req.params
    const {HoTen,SoDienThoai,DiaChi,BienSoXe,AnhDaiDien,AnhXe} = req.query
    console.log(UserName)
    const  taixe = await TaiXe.findByIdAndUpdate(id, {HoTen,SoDienThoai,DiaChi,BienSoXe,AnhDaiDien,AnhXe}, {new: true})
    res.json({
        taixe
  })  
}