const FS = require('fs')
const Path = require('path')
const uuid = require('uuid/v4')

// var config = JSON.parse(FS.readFileSync("config-secret.json"))

var mysql      = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'fer',
  password : 'fer',
  database : 'hyf_todo'
})

class Todo {

  //NOTE: future implementation, add user ID here.
  init(){
    //Connect to mysql
    connection.connect()
    // define which database to use
    connection.query('SOME * SQL STATEMENT ? HERE',  (error, results, fields) =>{
      if (error) throw error
    })

    // check for tables and create if it is not there.
    connection.query("SOME * SQL STATEMENT ? HERE", (error, results, fields)=>{
      if (error) throw error

      if(results.length === 0){
        console.log("Creating TABLE 'task'")
        connection.query('SOME * SQL STATEMENT ? HERE', (error, results, fields) => {
          if (error) throw error
          console.log('Table created: ', results)
        })
      }
      else{
        console.log("TABLE already exist, using: ", results)
      }
    })
  }

  load(callback) {
    let sql ='SOME * SQL STATEMENT ? HERE'
    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results)
    })
  }


  create(_description, callback) {
    let sql = 'SOME * SQL STATEMENT ? HERE'
    let inserts = [_description];
    sql = mysql.format(sql, inserts);

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results)
    })
  }

  update(id, description, callback) {
    let sql = 'SOME * SQL STATEMENT ? HERE'
    let inserts = [description, parseInt(id.split(":")[1])]
    sql = mysql.format(sql, inserts)

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error

      const regex = /Rows.matched:.(\d{1,100})/g;
      let m = regex.exec(results.message)

      if (m[1] === '0' )
        error = {name : "NotFound"}

      callback(error, results)
    })
  }

  remove(id, callback) {
    let sql = 'SOME * SQL STATEMENT ? HERE'
    let inserts = [parseInt(id.split(":")[1])]
    sql = mysql.format(sql, inserts)

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      console.log( results )
      callback(error)
    })
  }

}

module.exports = new Todo()
