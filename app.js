var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var db = mongoose.connection;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
const fileUpload = require('express-fileupload');
const http = require("http")
const socketIO = require("socket.io")
const controllerTaiKhoan = require("./controllers/TaiKhoan")
const controllerChuyenDi = require("./controllers/ChuyenDi")
const controllerTaiXe = require("./controllers/TaiXe")
const TaiXe = require("./models/TaiXe")

const axios = require("axios")
/* var indexRouter = require('./routes/index'); */
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');

const TaiXe_route = require('./routes/TaiXe');
const TaiKhoan_route = require('./routes/TaiKhoan');
const ChuyenDi_route = require('./routes/ChuyenDi')

var app = express();
app.use(cors())
app.use(fileUpload());

const server = app.listen(8080, () => {
  console.log(`server running port 8080`)
})


// bắt thông tin tài xế đang online

//socket nhan-thong-tin-dat-ve 
//
const io = socketIO(server)
//tai xe online

io.on("connection", socket => {
  console.log("new client connected", + socket.id)
  // lay cac tai xe dang online -> gui ve server update-trang-thai-online

  //page Login/logOut
  socket.on("tai-xe-online", data => {
    console.log("tai-xe", data)

      let HoatDong = "Online"
      TaiXe.findOneAndUpdate({ SoDienThoai: data }, { HoatDong }, { new: true }).then(taixe => {

    })
  })
  //page Logout
  socket.on("logout-tai-khoan",async (data) => {
    let HoatDong = "Offline"
    await TaiXe.findOneAndUpdate({ SoDienThoai: data }, { HoatDong }, { new: true }).then(taixe => {
      console.log("TaiXe update off line")
    })

  })


  //component book
  socket.on("nhan-thong-tin-dat-ve", (data) => {
    
    //console.log("datanew:",data)
    //truy suat data lay tai xe dang online
    //gui ve tai xe gan nhat
    let indexMm=[];
    let arrayMm=[];
    let temp=0;
    
    for(let i=0;i<data.ArrKC.length;i++){
      arrayMm[i]=data.ArrKC[i];
    }
    
    
    arrayMm.sort(function(a, b){return a - b});

    for(let j=0;j<arrayMm.length;j++){
      indexMm[j]=data.ArrKC.indexOf(arrayMm[j]);
    }
    ////////////////////////
    console.log("taixeMin",data.ArrDriver[indexMm[0]])

    let SenDaTa={
      SDT:data.ArrDriver[indexMm[0]].SoDienThoai,
      ThongTinKhach:data.thongTinKhach
    }
    //do App xử lý link nên chuyển cho App.js trước để chuyển vô link Khach hang
    //gửi thông tin khach hàng -> App.js --> Tai xe có khoang cach min
    io.sockets.emit("co-nguoi-dat-ve", SenDaTa )
    let txTemp;
    //for(let i=0;i<indexMm.length;i++){
      //txTemp=data.ArrDriver[indexMm[i]];
      //console.log("taixeMin",txTemp)
      //io.sockets.emit("co-nguoi-dat-ve", txTemp)
    //}
    
    // for(let i=0;i<arrayMm;i++){
    //   if(arrayMm[i]>arrayMm[i+1])
    //   {
    //     let temp = arrayMn[i];
    //     arrayMm[i]=arrayMm[i+1];
    //     arrayMm[i+1]=temp
    //   }
    // }
    //console.log("Mang2",arrayMm)
    console.log("co nguoi dat ve", data)
    // while(indexMm.length < data.ArrKC.length){
    //   for(var i=0;i<data.ArrKC.length;i++){
    //     if(data.ArrKC[i] < data.ArrKC[i+1] && data.ArrKC[i] <= data.ArrKC[temp])
    //       temp=i+1;
    //   }
    //   indexMm.push(temp);
    // }
    // console.log(indexMm);
    
    

    //  let data = "co nguoi dat ve"

    //tim tai xe
  //   let thongtinchuyendi = {
  //     ArrDriver,
  //     ArrKC,
  //     noidon,
  //     noiden,
  //     sodienthoai,
  //     giatien,
  //     sokm
  // }
    

    //gửi thông tin cho tài xe gan nhat
    
  })

  
  
  //component comfirm
  socket.on("confirm-ne", data => {
    //let sen="thong-tin-dat-"+data.SDT;
    //gửi lại thông tin đến confirm cho tai xe

    io.sockets.emit("thong-tin-dat", data)
  })

  //componet route
  socket.on("chay-den-trang-route", data => {
    //Insert Thong tin chuyen di
    console.log(data)
    io.sockets.emit("tai-xe-load-route", data)
  })

  //component book khach hang
  socket.on("chay-den-tai-xe-xac-nhan", data=>{
     TaiXe.findOne({ SoDienThoai: data.phonedriver }).then(taixe=>{
        let thongtin ={
          taixe: {
            anhbactai: taixe.AnhDaiDien,
            hoten: taixe.HoTen,
            sodienthoai: taixe.SoDienThoai,
            biensoxe: taixe.BienSoXe
          },
          sdtKhach: data.sodienthoai
        }
            io.sockets.emit("truyen-den-trang-tai-xe-xac-nhan", thongtin)
     })
  })

  //nhận từ hach hang to route
  socket.on("truyen-data-route", data=>{
    io.sockets.emit("route-nhan-data", data)
  })
  //gửi data taixe to khach hang
  socket.on("gui-thong-tin-tai-xe", data=>{
    io.sockets.emit("truyen-from-confirm-to-find", data)
  })

  
  // socket.on("tai-xe-huy-dat-xe",()=>{ //set thoi gian 15s tai-xe gui
  //   //gui ve client thong bao 

  // })

  //   socket.on("tai-xe-huy-sau-15s-khong-confirm")
  //   socket.on("tai-xe-nhan-cuoc", ()=>{
  //     //gui ve nguoi dung
  //   })

  //  socket.on("khach-hang-xac-nhan-dat-cuoc", ()=>{

  //  })

  //  socket.on("khach-hang-huy-cuoc", ()=>{

  //  })

  //  socket.on("khach-hang-huy-cuoc-sau-15s-khong-confirm", ()=>{

  //  })

})

dotenv.config();

const urlDB = 'mongodb://localhost:27017/XeOmDB'
//connect db

mongoose.set('useCreateIndex', true)
mongoose
  .connect(urlDB, { useNewUrlParser: true })
  .then(() => console.log('DB Connected on port 27017! '));
db.on('error', (err) => {
  console.log('DB connection error:', err.message);
})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(expressValidator());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/taixe', TaiXe_route);
app.use('/taikhoan', TaiKhoan_route);
app.use('/chuyendi', ChuyenDi_route);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
