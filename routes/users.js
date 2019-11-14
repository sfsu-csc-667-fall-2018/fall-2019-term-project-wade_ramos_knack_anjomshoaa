var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/register', function(req, res, next) {
  
    console.log('Username: ', req.params.username);
    console.log('email: ', req.params.email);
    console.log('password: ', req.params.password);

    res.send('you are registered');

});

module.exports = router;
