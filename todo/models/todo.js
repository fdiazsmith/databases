const FS = require('fs')
const Path = require('path')
const uuid = require('uuid/v4')

const filename = Path.resolve(__dirname, '../data/todos.json')


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

  save(todos, callback) {
    FS.writeFile(filename, JSON.stringify(todos), callback)
  }

  create(_description, callback) {
    // var sql = "SELECT * FROM ?? WHERE ?? = ?";
    let sql = 'INSERT INTO `task` (`id`,`description`,`done`,`date_created`,`date_last_modified`) VALUES (NULL, ? , "0", NULL, NULL)'
    let inserts = [_description];
    sql = mysql.format(sql, inserts);

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results)
    })
  }

  update(id, description, callback) {
    let sql = 'UPDATE `task` SET description = ? WHERE ?'
    let inserts = [description, parseInt(id.split(":")[1])]
    sql = mysql.format(sql, inserts)
    console.log("ABOUT TO UPDATE >> ", sql )

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      console.log( results )
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
