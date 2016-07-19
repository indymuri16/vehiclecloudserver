var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '4200',
  password: 'nevergonnagiveliuup',
  database: 'liu'
});
connection.connect();

var c = 0;

for(a = 0; a <  90; a++){
  connection.query("select location from vehiclereport where id = "+ a + " order by time desc limit 1",function(err,result){
      if(result != ""){
        //console.log("result:" + result);

        var jesuschrist = JSON.stringify(result);

        console.log("Vehicle " + c + " \t " +jesuschrist);
      }
      c++;
  });
}
