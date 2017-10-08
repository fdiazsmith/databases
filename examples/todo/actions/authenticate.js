const { jwt , jwtOptions } = require('../util/setPassport')
const Users = require('../models/users')
const bcrypt = require('bcrypt')

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

    if( bcrypt.compareSync(req.body.password, results[0].password ) ) {
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      var payload = {id: results[0].id}
      var token = jwt.sign(payload, jwtOptions.secretOrKey)
      res.cookie('Authorization', 'JWT '+token)
      res.render('user', { username: username })
    } else {
      res.status(401).json({message:"Passwords did not match"})
    }
  })
}
