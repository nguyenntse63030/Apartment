var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/admin/dashboard', function (req, res, next) {
  res.render('admin/dashboard/list', { title: 'Express' });
});

router.get('/admin/customer', function (req, res, next) {
  res.render('admin/customer/list');
});

router.get('/admin/customer/:code', function (req, res, next) {
  res.render('admin/customer/list', { code: req.params.code });
});

router.get('/swagger', function (req, res, next) {
  res.render('swagger');
});

module.exports = router;

