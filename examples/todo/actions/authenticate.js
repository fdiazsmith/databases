const { jwt , jwtOptions } = require('../util/setPassport')
const Users = require('../models/users')
const bcrypt = require('bcrypt')

module.exports = function authenticate(request, response) {
  if(request.body.username && request.body.password){
    var username = request.body.username
    var password = request.body.password
  }


  Users.findOne(username, (error, results)=>{
    if ( error ) throw error

    if( ! results ){
      response.status(401).json({message:"no such user found"})
    }


    if( bcrypt.compareSync(request.body.password, results[0].password ) ) {
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      var payload = {id: results[0].id}
      var token = jwt.sign(payload, jwtOptions.secretOrKey)
      response.cookie('Authorization', 'JWT '+token)
      response.json({message: "ok", token: token})
      response.send();
    } else {
      response.status(401).json({message:"Passwords did not match"})
    }
  })
}
