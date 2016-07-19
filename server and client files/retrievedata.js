var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '4200',
  password: 'nevergonnagiveliuup',
  database: 'liu'
});
connection.connect();

lol = 1467743394;

connection.query('select id from destinations where time = ' + lol, function(err, result){
  console.log(result);

  lol = JSON.stringify(result);

  id = lol.substr(8,2);
  console.log(id);
});
