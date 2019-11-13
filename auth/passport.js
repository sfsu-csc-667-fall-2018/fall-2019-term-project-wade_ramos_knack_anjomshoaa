const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../db/index.js').Users;

  passport.use(new LocalStrategy(
    function(username, password, done) {
      
      Users.getUserByName(username)
      .then(( user , error ) => {
        
        console.log('basic strategy called')
        
        if(error)
        {
          return done(reject);
        }
        if(!user)
        {
          return done(null, false);
        }

        bcrypt.compare(password, user.password, (err, isValid) => {

          console.log('bcypt compare is called');
          if (err) {
            console.log(err);
            return done(err)
          }
          if (!isValid) {
            console.log('Validation: ', isValid)
            return done(null, false)
          }

          console.log(user)
          return done(null, user)
        })
      })      
    }));

module.exports = {passport:passport}

    // passport.use(new LocalStrategy(
    //   function(username, password, done) {
    //     User.findOne({ username: username }, function (err, user) {
    //       if (err) { return done(err); }
    //       if (!user) {
    //         return done(null, false, { message: 'Incorrect username.' });
    //       }
    //       if (!user.validPassword(password)) {
    //         return done(null, false, { message: 'Incorrect password.' });
    //       }
    //       return done(null, user);
    //     });
    //   }
    // ));


    // passport.use(new BasicStrategy(
    //   function(username, password, done) {
        
    //     Users.findOne({ username: username }, function (err, user) {
    //       if (err) { return done(err); }
    //       if (!user) { return done(null, false); }
    //       if (!user.validPassword(password)) { return done(null, false); }
    //       return done(null, user);
    //     });
  
    //   }
    // ));
  

