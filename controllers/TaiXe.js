
const TaiXe = require('../models/TaiXe')
const ChuyenDi = require('../models/ChuyenDi')
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

module.exports.GetByDate = async(req,res)=>{
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
}

module.exports.GetByMonth =async(req, res)=>{
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
}

module.exports.GetByWeek = async(req, res)=>{
    const taixes = await TaiXe.find()
    const chuyendis = await ChuyenDi.find()
    let Similarphone = []
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
}