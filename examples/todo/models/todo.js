const FS = require('fs')
const Path = require('path')
const uuid = require('uuid/v4')


const config = require('./config-secret.json')


var mysql      = require('mysql')

var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
})

class Todo {

  //NOTE: future implementation, add user ID here.
  init(){
    //Connect to mysql
    connection.connect()
    // define which database to use
    connection.query('USE hyf_todo',  (error, results, fields) =>{
      if (error) throw error
    })

    // check for tables and create if it is not there.
    connection.query("SHOW TABLES LIKE 'task'", (error, results, fields)=>{
      if (error) throw error

      if(results.length === 0){
        console.log("Creating TABLE 'task'")
        connection.query('CREATE TABLE task (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, description VARCHAR(50), done BOOL, date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  date_last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);', (error, results, fields) => {
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
    let sql ='SELECT * FROM `task`'
    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results)
    })
  }


  create(_description, callback) {
    let sql = 'INSERT INTO `task` (`id`,`description`,`done`,`date_created`,`date_last_modified`) VALUES (NULL, ? , "0", NULL, NULL)'
    let inserts = [_description];
    sql = mysql.format(sql, inserts);

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results)
    })
  }

  update(id, description, callback) {
    let sql = 'UPDATE `task` SET description = ? WHERE id=?'
    console.log("id ", id);
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
    let sql = 'DELETE FROM `task`  WHERE id=?'
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
