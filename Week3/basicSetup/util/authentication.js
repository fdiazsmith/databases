const fs = require('fs');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
// remember you need to create this file because it is not commited to repo
const config = JSON.parse(fs.readFileSync("./util/secret-jwt.json"));

const User = require('../models/User.js');

// you can find what you need here
// https://www.npmjs.com/package/passport-jwt#extracting-the-jwt-from-the-request
// NOTE: unless you sign you token with the an issuer and audience do not include them, otherwise it will fail to authenticate

// on Postman your Header Sould look like this:
// key          | Value
// Authorization: Bearer eyJhbGciOiJ.......

// passport docs, nice to have
// https://www.npmjs.com/package/passport

module.exports = { passport }
