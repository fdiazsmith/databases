const { jwt , jwtOptions } = require('../util/setPassport')
const Users = require('../models/users')
const bcrypt = require('bcrypt')

const saltRounds = 10


module.exports = function signin(request, response) {

  if(request.body.username && request.body.password){
    var username = request.body.username
    var password = bcrypt.hashSync(request.body.password, saltRounds)
  }

  Users.findOne(username, (error, results)=>{
    if ( error ) throw error

    if( results[0] === undefined ){

      Users.create(username, password, (error, results)=>{
        if ( error ) throw error

        if( ! results ){
          response.status(501).json({message:results})
        } else {

          Users.getID(username, (error, id )=>{
            var payload = {id: id }
            var token = jwt.sign(payload, jwtOptions.secretOrKey)
            response.json({message: "ok", token: token})
          })
        }

      })

    }
    else if(results[0].username === username){
      response.status(401).json({message:`User ${username} already exist`})
    }
  })

}
