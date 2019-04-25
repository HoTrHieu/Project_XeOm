var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/helloworld',(req,res)=>{
  res.json({sayHi:'hello form server, nice to meet you!'})
})

module.exports = router;
