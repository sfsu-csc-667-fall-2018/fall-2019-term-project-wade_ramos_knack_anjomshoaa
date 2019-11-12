const passport = require('passport-http');
const BasicStrategy = require('passport-http').BasicStrategy;
const Users = require('./db/index.js');

passport.use(new BasicStrategy(
    function(username, password, done) {
      
      Users.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.validPassword(password)) { return done(null, false); }
        return done(null, user);
      });

    }
  ));

