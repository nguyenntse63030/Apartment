var express = require('express');
var router = express.Router();
const authService = require('../api/v1/services/authService')
const constant = require('../configs/constant')

/* GET home page. */
router.get('/swagger', function (req, res, next) {
  res.render('swagger');
});

router.get('/', function (req, res, next) {
  res.render('index');
});


router.get('/*', async function (req, res, next) {
  const token = req.session.token
  try {
    if (req.url.indexOf('/api/v1/') === 0) {
      return next()
    } else {
      await authService.isWebLogin(token)
      return next()
    }
  } catch (error) {
    res.redirect('/')
  }
})

router.get('/dashboard', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/dashboard/list', { role: req.session.user.role, title: 'Dashboard' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/dashboard/list', { role: req.session.user.role, title: 'Dashboard' });
  }
});

router.get('/customer', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/customer/list', { role: req.session.user.role, title: 'Customer' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/customer/list', { role: req.session.user.role, title: 'Customer' });

  }
});

router.get('/customer/:code', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/customer/detail', { code: req.params.code, role: req.session.user.role, title: 'Customer Detail' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/customer/detail', { code: req.params.code, role: req.session.user.role, title: 'Customer Detail' });
  }
});

router.get('/room', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/room/list', { code: req.params.code, role: req.session.user.role, title: 'Room' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/room/list', { code: req.params.code, role: req.session.user.role, title: 'Room' });

  }
});

module.exports = router;

