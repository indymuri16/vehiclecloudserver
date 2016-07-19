//obtained query from the user
var report = "12349677801";

var io = require('socket.io-client');
var socket = io('http://localhost:8000',{query: report});
//Taking out the following line:
//var ioClient = io.connect('http://localhost:8000');


var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '4200',
  password: 'nevergonnagiveliuup',
  database: 'liu'
});
connection.connect();

var destiny = "";

var iv = 78;

socket.on('foo', function(msg) { //Changed ioClient to socket
  console.info(msg);
  if(msg.substr(0,1) == "R"){

    connection.query("select destination from destinations where id = ? order by time desc limit 1",iv,function(err,result){
      console.log("result:" + result);

      var jesuschrist = JSON.stringify(result);
      console.log(jesuschrist);
      destiny = jesuschrist.substr(17,6);
      console.log(destiny);

      console.log("Destination is " + destiny);

      console.log("END OF PROGRAM");
      process.exit();

      return;
    });




  }
});
