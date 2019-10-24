// default express generator modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// added modules
const sequelize = require('./sequelize');
const GameState = require("./state.js");
const uuidv4 = require('uuid/v4');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gameRouter = require('./routes/game')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/game', gameRouter);

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



// let tempState = new GameState(uuidv4());

// // using States.create is one way of inputing data into the database.
// // we will use pg-promise for other types of queries
// sequelize.create({
//   uuid: tempState.uuid,
//   state: tempState.json
// })
//   .then(() => console.log("new entry has been created in db"));
// //TESTING OUT UUID, and States objects to put a json object in the database


module.exports = app;
