const mysql = require('mysql');
var connection = mysql.createPool({
  connectionLimit: 30,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'test3'
});
module.exports=connection;
