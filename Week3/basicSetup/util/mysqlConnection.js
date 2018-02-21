const fs = require('fs');
const mysql  = require('mysql');

  // it is best if the paths are absolute
  const config = JSON.parse(fs.readFileSync("./util/secret-config.json"));

  // create pool
  const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : config.host,
    user            : config.user,
    password        : config.password,
    database        : config.database
  });

  console.log("mysql pool: 👌");
//share the pool
module.exports = {pool, mysql}
