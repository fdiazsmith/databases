const fs = require('fs');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const config = JSON.parse(fs.readFileSync("./util/secret-jwt.json"));

const saltRounds = 12;

module.exports = function(req,res){
  // create new user
  // aka call the database

  // this would look more like:
  // req.body.username
  // req.body.first_name
  //... (bla bla bla ) what ever information you need
  let newuser = { // this is temp, will eventually get it from the request
    username: "fer",
    first_name: "fer",
    last_name: "diaz",
    password: "my plain text password"
   };

  // has the password and on a succesful callback create a new user and on the callback of that respond to client.
  // https://www.npmjs.com/package/bcrypt

}
