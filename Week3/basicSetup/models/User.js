const { pool, mysql } = require('../util/mysqlConnection.js');

class User {
  createNew(params, callback){
    if(  params.username === undefined
      || params.first_name === undefined
      || params.last_name === undefined
      || params.password === undefined ){
      callback(true, "one of the values was undefined");
      return;
    }

    let sql = 'INSERT INTO `users` (`id`,`username`,`first_name`,`last_name`,`password`) VALUES (NULL, ? , ?, ?, ?)';
    let inserts = [params.username, params.first_name, params.last_name, params.password];
    sql = mysql.format(sql, inserts);

    pool.getConnection(function(err, connection) {
    // Use the connection
    if(err) console.log("DB ERROR ☠️\n", err, connection);
      connection.query(sql, (err, results, fields) => {

        if ( err ) throw err;
        callback(err, results);
        connection.release();
      });
    });
  }
  findOne(id, callback){
    if(  id === undefined ){
      callback(true, "one of the values was undefined");
      return;
    }

    let sql = 'SELECT `id` FROM `users` WHERE id=?'
    let inserts = [id];
    sql = mysql.format(sql, inserts);

    pool.getConnection(function(err, connection) {
    // Use the connection
    if(err) console.log("DB ERROR ☠️\n", err, connection);
      connection.query(sql, (err, results, fields) => {
        if ( err ) throw err;
        console.log(results);
        callback(err, results);
        connection.release();
      });
    });
  }

  updatePassword(){
    // you should put the logic here
    console.log("updatePassword method");
  }
  updateNames(){
    // your logic here
  }
}

module.exports = new User();
