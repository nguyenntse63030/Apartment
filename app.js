var createError = require('http-errors');
var express = require('express');
const config = require('./config')
var path = require('path');
var engine = require('ejs-locals')
var session = require('express-session')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./configs/loadModelsMongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
require('./configs/passport').createPassportConfig(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine)


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'SWD-391',
  secure: true,
  httpOnly: true,
  secret: config.secret,
  resave: false,
  saveUninitialized: true
}))
//-----URL dẫn trang-----
app.use('/', indexRouter);
app.use('/users', usersRouter);

//-----API-----
app.use('/api/v1/user', require('./api/v1/route/user'));  //Dẫn đường dẫn API tới file route tướng ứng
app.use('/api/v1/auth', require('./api/v1/route/auth'));
app.use('/api/v1/room', require('./api/v1/route/room'));
app.use('/api/v1/apartment', require('./api/v1/route/apartment'));
app.use('/api/v1/news', require('./api/v1/route/news'));
app.use('/api/v1/bill', require('./api/v1/route/bill'));

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