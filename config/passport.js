const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models').User;
const settings = require('./settings');

function auth (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = settings.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.find({id: jwt_payload.id})
    .then( user => {
      if(user){
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch( err => done(err, false))
  }))
}

module.exports = auth;