const express = require('express');
const router = express.Router();
const db = require("../db/index.js");
const passport = require('../auth/passport').passport;

/* GET users listing. */
router.post('/register', function(req, res, next) {
  
    // console.log('Username: ', req.body.username);
    // console.log('email: ', req.body.email);
    // console.log('password: ', req.body.password);

    db.Users.create(req.body.username, req.body.email, req.body.password)
    .then(uuid => {
      console.log(uuid);
    })
    .catch(error => {
      console.log(error);
    });
      
    res.status(200).send('OK');

});


router.post('/login',  passport.authenticate('local', { session: false }), function(req, res, next) {
  
  // console.log('Username: ', req.body.username);
  // console.log('password: ', req.body.password);

  console.log('User Authenicated');

  console.log(req.user);

  res.status(200).send('OK');

});

module.exports = router;
