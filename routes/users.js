const express = require('express');
const router = express.Router();
const db = require("../db/index.js");
const passport = require('../auth/passport').passport;

const io = require('../socket/socketServer')

router.post('/register', function(req, res, next) {
    // console.log('Username: ', req.body.username);
    // console.log('email: ', req.body.email);
    // console.log('password: ', req.body.password);
    db.Users.create(req.body.username, req.body.email, req.body.password)
    .then(uuid => {
      console.log("User created: ", uuid);
    })
    .catch(error => {
      console.log(error);
    });
    res.status(200).send('OK');
});

router.post('/login',  passport.authenticate('local', { session: false }), function(req, res, next) {
  // console.log('User Authenicated');
  res.status(200).send('OK');
});

module.exports = router;
