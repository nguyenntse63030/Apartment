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
    return res.redirect('/')
  }
})

router.get('/dashboard', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/dashboard/list', { role: req.session.user.role, title: 'Dashboard' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/dashboard/list', { role: req.session.user.role, title: 'Dashboard' });
  } else {
    res.redirect('/')
  }
});

router.get('/user', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/user/list', { role: req.session.user.role, title: 'User' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/user/list', { role: req.session.user.role, title: 'User' });
  } else {
    res.redirect('/')
  }
});

router.get('/user/create', function (req, res, next) {
  let role = req.session.user.role
  // if (role === constant.userRole.MANAGER) {
  //   res.render('manager/user/create', { role: req.session.user.role, title: 'Create User' });
  // } else 
  if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/user/create', { role: req.session.user.role, title: 'Create User' });
  } else {
    res.redirect('/')
  }
});

router.get('/customer/:code', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/user/detail', { code: req.params.code, role: req.session.user.role, title: 'Customer Detail' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/user/detail', { code: req.params.code, role: req.session.user.role, title: 'Customer Detail' });
  } else {
    res.redirect('/')
  }
});

router.get('/manager/create', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/manager/create', { role: req.session.user.role, title: 'Create Manager' });
  } else {
    res.redirect('/')
  }
});

router.get('/manager/:code', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/user/detail', { code: req.params.code, role: req.session.user.role, title: 'Manager Detail' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/user/detail', { code: req.params.code, role: req.session.user.role, title: 'Manager Detail' });
  } else {
    res.redirect('/')
  }
});

router.get('/room', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/room/list', { role: req.session.user.role, title: 'Room' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/room/list', { role: req.session.user.role, title: 'Room' });
  } else {
    res.redirect('/')
  }
});

router.get('/room/create', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/room/create', { code: req.params.code, role: req.session.user.role, title: 'Create Room' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/room/create', { code: req.params.code, role: req.session.user.role, title: 'Create Room' });
  } else {
    res.redirect('/')
  }
});

router.get('/room/:code/bill/create', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/bill/create', { roomCode: req.params.code, role: req.session.user.role, title: 'Create Bill' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/bill/create', { roomCode: req.params.code, role: req.session.user.role, title: 'Create Bill' });
  } else {
    res.redirect('/')
  }
});

router.get('/room/:code', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/room/detail', { code: req.params.code, role: req.session.user.role, title: 'Room Detail' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/room/detail', { code: req.params.code, role: req.session.user.role, title: 'Room Detail' });
  } else {
    res.redirect('/')
  }
});

router.get('/apartment/', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/apartment/list', { role: req.session.user.role, title: 'Apartment' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/apartment/list', { role: req.session.user.role, title: 'Apartment' });
  } else {
    res.redirect('/')
  }
});

router.get('/apartment/create', function (req, res, next) {
  res.render('supervisor/apartment/create', { role: req.session.user.role, title: 'Create Apartment' });
});

router.get('/apartment/:code', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/apartment/detail', { code: req.params.code, role: req.session.user.role, title: 'Apartment Detail' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/apartment/detail', { code: req.params.code, role: req.session.user.role, title: 'Apartment Detail' });
  } else {
    res.redirect('/')
  }
});

router.get('/bill', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/bill/list', { role: req.session.user.role, title: 'Bill' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/bill/list', { role: req.session.user.role, title: 'Bill' });
  } else {
    res.redirect('/')
  }
});

router.get('/bill/:code', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/bill/detail', { code: req.params.code, role: req.session.user.role, title: 'Bill Detail' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/bill/detail', { code: req.params.code, role: req.session.user.role, title: 'Bill Detail' });
  } else {
    res.redirect('/')
  }
});

router.get('/setting', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/setting/unitPrice', { role: req.session.user.role, title: 'Unit Price Setting' });
  } else {
    res.redirect('/')
  }
});

router.get('/profile', function (req, res, next) {
  let role = req.session.user.role
  if (role === constant.userRole.MANAGER) {
    res.render('manager/profile', { id: req.session._id, role: req.session.user.role, title: 'User Profile' });
  } else if (role === constant.userRole.SUPERVISOR) {
    res.render('supervisor/profile', { id: req.session._id, role: req.session.user.role, title: 'User Profile' });
  } else {
    res.redirect('/')
  }
});

module.exports = router;

