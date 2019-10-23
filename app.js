// default express generator modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// added modules
const States = require('./sequelize');
const uuidv4 = require('uuid/v4');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

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

//TESTING OUT UUID, and States objects to put a json object in the database
initGameState = (_uuid) => {
  var o = {} // empty Object
  var key = 'state';
  o[key] = []; // empty Array, which you can push() values into
  var data = {
      uuid:_uuid,
      playerCount:0,
      pot: 0,
      deck:[],
      players:[],
      currentPlayer:'none'
  };
  o[key].push(data);
  return JSON.stringify(o);
}

let id = uuidv4();
let json = initGameState(id);

console.log(json);

// using States.create is one way of inputing data into the database.
// we will use pg-promise for other types of queries
States.create({
  uuid: id,
  state: json
})
  .then(() => console.log("new entry has been created in db"));
//TESTING OUT UUID, and States objects to put a json object in the database

module.exports = app;