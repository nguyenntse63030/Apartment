var express = require('express');
var router = express.Router();
const authService = require('../api/v1/services/authService')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/*', async function (req, res, next) {
  const token = req.session.token
  try {
    await authService.isWebLogin(token)
    next()
  } catch (error) {
    res.redirect('/')
  }
})

router.get('/admin/dashboard', function (req, res, next) {
  res.render('admin/dashboard/list', { role: req.session.user.role, title: 'Dashboard' });
});

router.get('/admin/customer', function (req, res, next) {
  res.render('admin/customer/list', { role: req.session.user.role, title: 'Customer' });
});

router.get('/admin/customer/:code', function (req, res, next) {
  res.render('admin/customer/detail', { code: req.params.code, role: req.session.user.role, title: 'Customer Detail' });
});

router.get('/swagger', function (req, res, next) {
  res.render('swagger');
});

module.exports = router;

