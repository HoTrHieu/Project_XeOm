    const TaiXe = require("../models/TaiXe");
    const ChuyenDi = require("../models/ChuyenDi");
    module.exports.GetSoDienThoai = async (req, res) => {
    //getSoDenThoai

    const SoDienThoai = req.params.id;
    console.log(SoDienThoai);
    await TaiXe.findOne({ SoDienThoai }).then((taixe) => {
        res.json({ taixe });
    });
    };

    module.exports.Add = async (req, res) => {
    //Add
    const { HoTen, SoDienThoai, DiaChi, BienSoXe, AnhDaiDien, AnhXe } = req.body;

    const taixe = new TaiXe({
        HoTen,
        SoDienThoai,
        DiaChi,
        BienSoXe,
        AnhDaiDien,
        AnhXe
    });
    const new_Taixe = await taixe.save();
    res.json({
        new_Taixe
    });
    };
    module.exports.Select = async (req, res) => {
    //Select

    const taixe = await TaiXe.find({});
    res.json({
        taixe
    });
    };

    module.exports.Delete = async (req, res) => {
    //delete
    const { id } = req.params;
    const taixe = await TaiXe.findOneAndRemove({ _id: id });
    res.json({
        taixe
    });
    };

    module.exports.Upload =  async (req, res, next) => {
        if (req.files) {
            var file = req.files.file;
            const data = [];
            console.log(file);
            var time = new Date()
                .toJSON()
                .slice(0, 19)
                .replace(/[-T:]/g, "");
            for (var i = 0; i < file.length; i++) {
                console.log(file[i].name);
                file[i].mv(
                `${__dirname}/../public/AnhXe/${time}-${file[i].name}`,
                function(err) {
                    if (err) {
                        return res.send(err);
                    }
                }
                );
                data.push(`public/AnhXe/${time}-${file[i].name}`);
            }
            return res.send(data);
        }
    };
        
        // upload single file
        module.exports.UploadSingle = async(req, res, next) => {
        let imageFile = req.files.file;
        console.log(imageFile);
        var time = new Date()
            .toJSON()
            .slice(0, 19)
            .replace(/[-T:]/g, "");
        await imageFile.mv(
            `${__dirname}/../public/AnhDaiDien/${time}-${imageFile.name}`,
            function(err) {
                if (err) {
                return res.status(500).send(err);
                }
                res.json({ file: `public/AnhDaiDien/${time}-${imageFile.name}` });
            }
        );
        };
          

    module.exports.Update = async (req, res) => {
    //Update
    const { id } = req.params;
    const {
        HoTen,
        SoDienThoai,
        DiaChi,
        BienSoXe,
        AnhDaiDien,
        AnhXe
    } = req.query;
    console.log(UserName);
    const taixe = await TaiXe.findByIdAndUpdate(
        id,
        { HoTen, SoDienThoai, DiaChi, BienSoXe, AnhDaiDien, AnhXe },
        { new: true }
    );
    res.json({
        taixe
    });
    };

    module.exports.GetData = async (req, res) => {
    const taixes = await TaiXe.find();
    let data = req.params.time + "";
    let type = data.slice(0, 1);
    let timeData = data.slice(2, data.length);
    console.log("timeData: ", timeData);
    console.log("type: ", type);

    let year = timeData.substr(0, 4);
    let month = timeData.substr(4, 2);
    let week = timeData.substr(timeData.length - 1);
    const dataWeek = [];
    const week1 = ["01", "02", "03", "04", "05", "06", "07"];
    const week2 = ["08", "09", "10", "11", "12", "13", "14"];
    const week3 = ["15", "16", "17", "18", "19", "20", "21"];
    const week4 = ["22", "23", "24", "25", "26", "27", "28"];
    const week5 = ["29", "30", "31"];

    const chuyendis = await ChuyenDi.find();
    let Similarphone = [];
    chuyendis.map((chuyendi) => {
        taixes.map((taixe) => {
            if (type === "D") {
            let time = new Date(chuyendi.TinhTrang["time"])
                .toJSON()
                .slice(0, 10)
                .replace(/[-T:]/g, "");
            /* time = time.slice(4,15);
                time= time.replace(/\s/g, '') */
            if (taixe.SoDienThoai == chuyendi.SDTTaiXe && time === timeData) {
                Similarphone.push({ SimilarPhone: { chuyendi, taixe, time } });
            }
            } else if (type === "M") {
            let time = new Date(chuyendi.TinhTrang["time"])
                .toJSON()
                .slice(0, 8)
                .replace(/[-T:]/g, "");
            if (taixe.SoDienThoai == chuyendi.SDTTaiXe && time === timeData) {
                Similarphone.push({ SimilarPhone: { chuyendi, taixe, time } });
            }
            } else if (type === "W") {
            let monthyear = new Date(chuyendi.TinhTrang["time"])
                .toJSON()
                .slice(0, 8)
                .replace(/[-T:]/g, "");
            console.log("l: " + monthyear);
            let day = new Date(chuyendi.TinhTrang["time"])
                .toJSON()
                .slice(8, 10)
                .replace(/[-T:]/g, "");
            if (
                taixe.SoDienThoai === chuyendi.SDTTaiXe &&
                monthyear === year + "" + month
            ) {
                if (week === "1") {
                    for (var d of week1) {
                        if (d === day) {
                        Similarphone.push({
                            SimilarPhone: { chuyendi, taixe }
                        });
                        }
                    }
                } else if (week === "2") {
                    for (var d of week2) {
                        if (d === day) {
                        Similarphone.push({
                            SimilarPhone: { chuyendi, taixe }
                        });
                        }
                    }
                } else if (week === "3") {
                    for (var d of week3) {
                        if (d === day) {
                        Similarphone.push({
                            SimilarPhone: { chuyendi, taixe }
                        });
                        }
                    }
                } else if (week === "4") {
                    for (var d of week4) {
                        if (d === day) {
                        Similarphone.push({
                            SimilarPhone: { chuyendi, taixe }
                        });
                        }
                    }
                } else if (week === "5") {
                    for (var d of week5) {
                        if (d === day) {
                        Similarphone.push({
                            SimilarPhone: { chuyendi, taixe }
                        });
                        }
                    }
                }
            }
            }
        });
    });
    res.json({
        Similarphone
    });
    };

    module.exports.GetByPhone = async (req, res) => {
    const phone = req.params.id;
    const type = req.params.type;
    const timeData = req.params.time;

    let year = timeData.substr(0, 4);
    let month = timeData.substr(4, 2);
    let week = timeData.substr(timeData.length - 1);
    const dataWeek = [];
    const week1 = ["01", "02", "03", "04", "05", "06", "07"];
    const week2 = ["08", "09", "10", "11", "12", "13", "14"];
    const week3 = ["15", "16", "17", "18", "19", "20", "21"];
    const week4 = ["22", "23", "24", "25", "26", "27", "28"];
    const week5 = ["29", "30", "31"];

    const taixes = await TaiXe.find({ SoDienThoai: phone });
    const chuyendis = await ChuyenDi.find({ SDTTaiXe: phone });

    let Similarphone = [];
    chuyendis.map((chuyendi) => {
        taixes.map((taixe) => {
            if (type === "D") {
            let time = new Date(chuyendi.TinhTrang["time"])
                .toJSON()
                .slice(0, 10)
                .replace(/[-T:]/g, "");
            /* time = time.slice(4,15);
                time= time.replace(/\s/g, '') */
            if (
                taixe.SoDienThoai == chuyendi.SDTTaiXe &&
                time === timeData &&
                chuyendi.TinhTrang["status"] !== "NhanKhach"
            ) {
                Similarphone.push({ SimilarPhone: { chuyendi, taixe, time } });
            }
            } else if (type === "M") {
            let time = new Date(chuyendi.TinhTrang["time"])
                .toJSON()
                .slice(0, 8)
                .replace(/[-T:]/g, "");
            if (taixe.SoDienThoai == chuyendi.SDTTaiXe && time === timeData) {
                Similarphone.push({ SimilarPhone: { chuyendi, taixe, time } });
            }
            } else if (type === "W") {
            let monthyear = new Date(chuyendi.TinhTrang["time"])
                .toJSON()
                .slice(0, 8)
                .replace(/[-T:]/g, "");
            console.log("l: " + monthyear);
            let day = new Date(chuyendi.TinhTrang["time"])
                .toJSON()
                .slice(8, 10)
                .replace(/[-T:]/g, "");
            if (
                taixe.SoDienThoai === chuyendi.SDTTaiXe &&
                monthyear === year + "" + month
            ) {
                if (week === "1") {
                    for (var d of week1) {
                        if (d === day) {
                        Similarphone.push({
                            SimilarPhone: { chuyendi, taixe }
                        });
                        }
                    }
                } else if (week === "2") {
                    for (var d of week2) {
                        if (d === day) {
                        Similarphone.push({
                            SimilarPhone: { chuyendi, taixe }
                        });
                        }
                    }
                } else if (week === "3") {
                    for (var d of week3) {
                        if (d === day) {
                        Similarphone.push({
                            SimilarPhone: { chuyendi, taixe }
                        });
                        }
                    }
                } else if (week === "4") {
                    for (var d of week4) {
                        if (d === day) {
                        Similarphone.push({
                            SimilarPhone: { chuyendi, taixe }
                        });
                        }
                    }
                } else if (week === "5") {
                    for (var d of week5) {
                        if (d === day) {
                        Similarphone.push({
                            SimilarPhone: { chuyendi, taixe }
                        });
                        }
                    }
                }
            }
            }
        });
    });
    res.json({
        Similarphone
    });
    };

    module.exports.UpdateHoatDong = async (req, res) => {
    const { id } = req.params;
    const { HoatDong } = req.body;
    const taixe = await TaiXe.findByIdAndUpdate(id, { HoatDong }, { new: true });
    res.json({
        taixe
    });
    };
    module.exports.text = async (req, res) => {
    console.log("toi dang update on line");
    };

    module.exports.GetGroupByPhone = async (req, res) => {
        const type = req.params.type;
        const timeData = req.params.time;

        let year = timeData.substr(0,4)
        let month = timeData.substr(4,2)
        let weekorday = timeData.substr(6, timeData.length)

        const dataWeek = [];
        const week1 = ["01", "02", "03", "04", "05", "06", "07"];
        const week2 = ["08", "09", "10", "11", "12", "13", "14"];
        const week3 = ["15", "16", "17", "18", "19", "20", "21"];
        const week4 = ["22", "23", "24", "25", "26", "27", "28"];
        const week5 = ["29", "30", "31"];

        let taixes
        if(type==="D"){
            let timeFind = year + '-' + month + '-' + weekorday; 
            taixes = await TaiXe.aggregate([
            
                {
                    $lookup:{
                        from: 'ChuyenDi',
                        localField: 'SoDienThoai',
                        foreignField: 'SDTTaiXe',
                        as: 'ChuyenDi'
                    }
                },
                {$unwind:"$ChuyenDi"},
                {$match:
                    {
                        $and: [
                            {"ChuyenDi.TinhTrang.status":'HoanThanh'},
                            {"ChuyenDi.TinhTrang.time": {$regex: timeFind}}
                        ]    
                    } 
                },
                {
                    $group:{
                        _id:{
                            SoDienThoai: "$SoDienThoai",
                            HoTen: "$HoTen",
                            BienSoXe: "$BienSoXe"
                        },
                        groupname: {
                            $first: "$SoDienThoai"
                        },
                        totalKmHoanThanh: {$sum: "$ChuyenDi.SoKm"},
                        totalSoTien: {$sum: "$ChuyenDi.SoTien"},
                        ChuyenDi: {
                            $push: "$ChuyenDi"}
                    }
                },
                
                
                
            ])
        }
        else if(type==="M"){
            let timeFind = year + '-' + month

            taixes = await TaiXe.aggregate([
            
                {
                    $lookup:{
                        from: 'ChuyenDi',
                        localField: 'SoDienThoai',
                        foreignField: 'SDTTaiXe',
                        as: 'ChuyenDi'
                    }
                },
                {$unwind:"$ChuyenDi"},
                {$match:
                    {
                        $and: [
                            {"ChuyenDi.TinhTrang.status":'HoanThanh'},
                            {"ChuyenDi.TinhTrang.time": {$regex: timeFind}}
                        ]    
                    } 
                },
                {
                    $group:{
                        _id:{
                            SoDienThoai: "$SoDienThoai",
                            HoTen: "$HoTen",
                            BienSoXe: "$BienSoXe"
                        },
                        groupname: {
                            $first: "$SoDienThoai"
                        },
                        totalKmHoanThanh: {$sum: "$ChuyenDi.SoKm"},
                        totalSoTien: {$sum: "$ChuyenDi.SoTien"},
                        ChuyenDi: {
                            $push: "$ChuyenDi"}
                    }
                },
                
                
                
            ])
        }
        else if(type==="W"){
            let timeFindMin;
            let timeFindMax;
            if(weekorday === '1'){
                timeFindMin = year+'-'+month+'-01'
                timeFindMax = year+'-'+month+'-08'
            }
            if(weekorday === '2'){
                timeFindMin = year+'-'+month+'-08'
                timeFindMax = year+'-'+month+'-15'
            }
            if(weekorday === '3'){
                timeFindMin = year+'-'+month+'-15'
                timeFindMax = year+'-'+month+'-22'
            }
            if(weekorday === '4'){
                timeFindMin = year+'-'+month+'-22'
                timeFindMax = year+'-'+month+'-29'
            }
            if(weekorday === '5'){
                timeFindMin = year+'-'+month+'-29'
                timeFindMax = year+'-'+month+'-32'
            }
            console.log(weekorday);
            console.log(timeFindMin);
            console.log(timeFindMax);

            taixes = await TaiXe.aggregate([
            
                {
                    $lookup:{
                        from: 'ChuyenDi',
                        localField: 'SoDienThoai',
                        foreignField: 'SDTTaiXe',
                        as: 'ChuyenDi'
                    }
                },
                {$unwind:"$ChuyenDi"},
                {$match:
                    {
                        $and: [
                            {"ChuyenDi.TinhTrang.status":'HoanThanh'},
                            /* {"ChuyenDi.TinhTrang.time": {$gte: {$regex: timeFindMin}, $lt: {$regex: timeFindMax}} }  */
                            {"ChuyenDi.TinhTrang.time": {
                                $gte: timeFindMin,
                                $lte: timeFindMax
                            }}
                        ]    
                    } 
                },
                {
                    $group:{
                        _id:{
                            SoDienThoai: "$SoDienThoai",
                            HoTen: "$HoTen",
                            BienSoXe: "$BienSoXe"
                        },
                        groupname: {
                            $first: "$SoDienThoai"
                        },
                        totalKmHoanThanh: {$sum: "$ChuyenDi.SoKm"},
                        totalSoTien: {$sum: "$ChuyenDi.SoTien"},
                        ChuyenDi: {
                            $push: "$ChuyenDi"}
                    }
                },
                
                
                
            ])
        }
        let Similarphone = [];
        taixes.map((taixe) => {
            Similarphone.push({ SimilarPhone: { taixe } });
        });
        res.json({
            Similarphone
        });
    };

    