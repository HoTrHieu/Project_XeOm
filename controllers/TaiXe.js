
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
    const dataWeek = [];
    const week1 = ['01', '02', '03', '04', '05','06','07'];
    const week2 = ['08', '09', '10', '11', '12','13','14'];
    const week3 = ['15', '16', '17', '18', '19','20','21'];
    const week4 = ['22', '23', '24', '25', '26','27','28'];
    const week5 = ['29', '30', '31'];
    console.log(year+month);
    
    chuyendis.map(chuyendi=>{
        taixes.map(taixe=>{
            let monthyear = new Date(chuyendi.TinhTrang['time']).toJSON()
            .slice(0, 8)
            .replace(/[-T:]/g, "");
            console.log('l: ' + monthyear)
            let day = new Date(chuyendi.TinhTrang['time']).toJSON()
            .slice(8, 10)
            .replace(/[-T:]/g, "");
            if(taixe.SoDienThoai === chuyendi.SDTTaiXe && monthyear === year+''+month){
                if(week=== '1'){
                    for(var d of week1){
                        if(d ===day){
                            Similarphone.push({SimilarPhone:{chuyendi, taixe}})
                        }
                    }
                }else if(week=== '2'){
                    for(var d of week2){
                        if(d ===day){
                            Similarphone.push({SimilarPhone:{chuyendi, taixe}})
                        }
                    }
                }else if(week=== '3'){
                    for(var d of week3){
                        if(d ===day){
                            Similarphone.push({SimilarPhone:{chuyendi, taixe}})
                        }
                    }
                }else if(week=== '4'){
                    for(var d of week4){
                        if(d ===day){
                            Similarphone.push({SimilarPhone:{chuyendi, taixe}})
                        }
                    }
                }else if(week=== '5'){
                    for(var d of week5){
                        if(d ===day){
                            Similarphone.push({SimilarPhone:{chuyendi, taixe}})
                        }
                    }
                }
            }
        })
    })  
    res.json({
        Similarphone
    })
}

module.exports.GetByPhone =async(req, res)=>{
    const taixes = await TaiXe.find()
    const chuyendis = await ChuyenDi.find()
    let Similarphone = []
    chuyendis.map(chuyendi=>{
        taixes.map(taixe=>{
            if(taixe.SoDienThoai == chuyendi.SDTTaiXe && taixe.SoDienThoai === req.params.phone){
                Similarphone.push({SimilarPhone:{chuyendi, taixe}})
            }
        })
    })
    res.json({
        Similarphone
    })
}