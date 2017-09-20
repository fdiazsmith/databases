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



//


//
// connection.end();




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
    FS.readFile(filename, 'utf-8', (error, data) => {
      if (error) {
        callback(error)
      } else {
        callback(null, JSON.parse(data))
      }
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
    console.log("WHAT ", sql)

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results)
    })

    // this.load((error, todos) => {
    //   if (error) { callback(error); return }
    //
    //   const todo = {
    //     id: uuid(),
    //     description,
    //     done: false
    //   }
    //   todos.push(todo)
    //
    //   this.save(todos, error => {
    //     if (error) { callback(error); return }
    //
    //     callback(null, todo)
    //   })
    // })
  }

  update(id, description, callback) {
    this.load((error, todos) => {
      if (error) { callback(error); return }

      const todo = todos.find(t => t.id === id)
      if (todo == null) {
        const error = new Error(`Todo with ID ${id} does not exist`)
        error.name = 'NotFound'

        callback(error)
        return
      }

      todo.description = description

      this.save(todos, error => {
        if (error) { callback(error); return }

        callback(null, todo)
      })
    })
  }

  remove(id, callback) {
    this.load((error, todos) => {
      if (error) { callback(error); return }

      todos = todos.filter(t => t.id !== id)

      this.save(todos, error => {
        if (error) { callback(error); return }
        callback()
      })
    })
  }

}

module.exports = new Todo()
