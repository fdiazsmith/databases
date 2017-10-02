const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const config = require('./passport-secret.json')
const Users = require('../models/users')
const bcrypt = require('bcrypt')

// SET UP JWT
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.secretOrKey;

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:

  Users.findOneByID( jwt_payload.id, (error, results )=>{
    if ( error ) throw error

    if(results[0] === undefined){
      next(null, false);
    }
    else if( results[0].id ){
      next(null, results[0] );
    }
  })

});

// S E T   U P   U S A G E
passport.use(strategy);

module.exports = {
  jwt : jwt,
  passport : passport,
  jwtOptions : jwtOptions
}
