const config = require('./config-secret.json')


const mysql      = require('mysql')

const connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
})

//Connect to mysql
connection.connect()
// define which database to use
connection.query('USE hyf_todo',  (error, results, fields) =>{
  if (error) throw error
})

module.exports = {
  mysql : mysql,
  connection: connection
}
