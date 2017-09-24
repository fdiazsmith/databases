var fs = require('fs')
var mysql = require('mysql')

var config = JSON.parse(fs.readFileSync("config-secret.json"))
console.log( config )

var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
})

connection.connect( )

connection.query('SELECT 2 + 2 AS result', function (error, results, fields) {
		if ( error ) console.error( error )
		else console.log( results )
})

connection.end( )
