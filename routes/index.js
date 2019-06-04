var express = require('express');
var router = express.Router();


/* let TaiKhoan = require('../controllers/TaiKhoan'); */

/* router.get('/login',TaiKhoan.show_login); */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* router.get('/api/helloworld',(req,res)=>{
  res.json({sayHi:'hello form server, nice to meet you!'})
}) */



module.exports = router;