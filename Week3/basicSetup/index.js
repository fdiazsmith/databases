const Express = require('express');
const app = Express();

const sql = require('./util/mysqlConnection.js');
const {passport} = require('./util/authentication.js');
const action = require("./actions");

app.use(passport.initialize());
app.use(passport.session());
console.log(action.signup());

app.get('/', (req, res)=>{
  res.send({message: "hello"})
});
//passport.authenticate('jwt', { session: false })

app.get('/s', passport.authenticate('jwt', { session: false }), (req, res)=>{
  res.send({message: "autherization succeded"})
});


//start server
app.listen(3000, function(){
  console.log("Server up listeing on port 3000");
});
passport.authenticate('jwt', { session: false })
