const uuid = require('uuid/v4')
const { mysql , connection } = require('../util/connectToMysql')


class Users {

  //NOTE: future implementation, add user ID here.
  init(){
    console.log("who is calling this?");
    connection.query('CREATE TABLE IF NOT EXISTS `users` (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, username VARCHAR(50), password VARCHAR(255), date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  date_last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);', (error, results, fields) => {
      if (error) throw error
    })

  }

  showAll(callback) {
    let sql ='SELECT username FROM `users`'
    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results)
    })
  }


  create(username, password, callback) {
    let sql = 'INSERT INTO `users` (`id`,`username`,`password`,`date_created`,`date_last_modified`) VALUES (NULL, ? , ?, NULL, NULL)'
    let inserts = [username, password];
    sql = mysql.format(sql, inserts);

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results)
    })
  }

  findOne(username, callback) {
    let sql = 'SELECT * FROM `users` WHERE username=?'
    let inserts = [ username ]
    sql = mysql.format(sql, inserts)

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results)
    })
  }
  findOneByID(id, callback) {
    let sql = 'SELECT * FROM `users` WHERE id=?'
    let inserts = [ id ]
    sql = mysql.format(sql, inserts)

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results)
    })
  }

  getID(username, callback) {
    let sql = 'SELECT * FROM `users` WHERE username=?'
    let inserts = [ username ]
    sql = mysql.format(sql, inserts)

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error, results[0].id)
    })
  }

  remove(username, callback) {
    let sql = 'DELETE FROM `users`  WHERE username=?'
    let inserts = [parseInt(id.split(":")[1])]
    sql = mysql.format(sql, inserts)

    connection.query(sql, (error, results, fields) => {
      if ( error ) throw error
      callback(error)
    })
  }

}

module.exports = new Users()
