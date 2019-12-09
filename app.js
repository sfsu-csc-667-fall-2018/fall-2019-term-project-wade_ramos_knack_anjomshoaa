// default express generator modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('passport');
// const session = require('express-session')
// const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');

// dotenv setup when in development mode


if(process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

global.__basedir = __dirname;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gameRouter = require('./routes/game')
const testRouter = require('./routes/test')

const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
//react 
//app.use(express.static("./build"))


// passport setup
// app.use(express.session({ secret: process.env.SESSION_SECRET }));

// app.use(session({
//   store: new pgSession({ 
//     pgPromise: require('./db/postgres').connection
//     }),
//   secret: 'TEMPORARY',
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize());
// app.use(passport.session());	


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gameslobby', gameRouter);
app.use('/test', testRouter);

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
