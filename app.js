var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var db=mongoose.connection;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
const fileUpload = require('express-fileupload');

/* var indexRouter = require('./routes/index'); */
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');

const TaiXe_route = require('./routes/TaiXe');
const TaiKhoan_route = require('./routes/TaiKhoan');
const ChuyenDi_route = require('./routes/ChuyenDi')
var app = express();
app.use(cors())
app.use(fileUpload());


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
app.use('/taixe',TaiXe_route);
app.use('/taikhoan',TaiKhoan_route);
app.use('/chuyendi',ChuyenDi_route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
