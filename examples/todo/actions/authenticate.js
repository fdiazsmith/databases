const _ = require("lodash")
const { jwt , jwtOptions } = require('../util/setPassport')
const Users = require('../models/users')

module.exports = function authenticate(request, response) {
  if(request.body.username && request.body.password){
    var username = request.body.username
    var password = request.body.password
  }

  // usually this would be a database call:
  var user = Users.findUser(username, (error, results)=>{
    if ( error ) throw error

    if( ! results ){
      response.status(401).json({message:"no such user found"})
    }

    if(results[0].password === request.body.password) {
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      var payload = {id: results[0].id}
      var token = jwt.sign(payload, jwtOptions.secretOrKey)
      response.json({message: "ok", token: token})
    } else {
      response.status(401).json({message:"passwords did not match"})
    }
  })
}
