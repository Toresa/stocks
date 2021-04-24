var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:symbol', function(req, res, next) {
  res.json([1,2,3]);
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
