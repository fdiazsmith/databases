const fs = require('fs');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const config = JSON.parse(fs.readFileSync("./util/secret-jwt.json"));


module.exports = function authenticate(req, res) {
  if(req.body.username && req.body.password){
    var username = req.body.username
    var password = req.body.password
  }


  Users.findOne(username, (error, results)=>{
    if ( error ) throw error
    if( ! results ){
      res.status(401).json({message:"no such user found"})
    }
    // make sure the user exist before comparing passwords
    // compare has and on the callback respond to cliend with a jwt token
    // https://www.npmjs.com/package/bcrypt

  })
}
