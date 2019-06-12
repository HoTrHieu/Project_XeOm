
 
const ChuyenDi = require('../models/ChuyenDi')

module.exports.AddChuyenDi = async (req,res)=>{ //add 
    console.log("XuatNhanChuyen",req.body);
//    const {SDTKhach,SDTTaiXe,DiaDiemDon,DiaDiemDi,SoKm,SoTien,TinhTrang} = req.body
//    const chuyendi = new ChuyenDi({SDTKhach,SDTTaiXe,DiaDiemDon,DiaDiemDi,SoKm,SoTien,TinhTrang})
//    const new_chuyendi= await chuyendi.save()
//    res.json({
//        new_chuyendi
//    })
}
module.exports.GetAllChuyenDi = async (req, res)=>{  //GetAllChuyenDi
   
   const chuyendi = await ChuyenDi.find({})
   res.json({
       chuyendi
    })
}
module.exports.getIdChuyenDi = async (req, res)=>{ //select theo id
     const {id} = req.params
     const chuyendi = await ChuyenDi.findById(id)
     res.json({
       chuyendi
     })
}
module.exports.Delete = async (req, res)=>{ //delete
       const {id} = req.params
       const  chuyendi = await ChuyenDi.findOneAndRemove({_id: id})
      res.json({
       chuyendi
      })
}

module.exports.Update = async (req, res)=>{ //update
   const {id} = req.params
   const{SDTKhach,SDTTaiXe,DiaDiemDon,DiaDiemDi,SoKm,SoTien,TinhTrang} = req.query
   console.log(UserName)
   const  chuyendi = await ChuyenDi.findByIdAndUpdate(id,{SDTKhach,SDTTaiXe,DiaDiemDon,DiaDiemDi,SoKm,SoTien,TinhTrang}, {new: true})
   res.json({
       chuyendi
 })  
}

module.exports.UpdateTinhTrang= async (req,res)=>{ 
    const {id} = req.params
    const {TinhTrang} = req.body
    const  chuyendi= await ChuyenDi.findByIdAndUpdate(id, {TinhTrang:{
        status:TinhTrang,
        time: Date.now()
    }}, {new: true})
    res.json({
        chuyendi
    })
 }






