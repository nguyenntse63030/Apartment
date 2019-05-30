var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/swagger', function(req, res, next) {
  res.render('swagger');
  // res.sendFile('/dist/index.html');
});

module.exports = router;

