//obtained query from the user
var ttquery = "0123496000000";

var io = require('socket.io-client');
var socket = io('http://localhost:8000',{query: ttquery});
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

var loc = ttquery.substr(1,6);

socket.on('foo', function(msg) { //Changed ioClient to socket
  console.info(msg);
  if(msg.substr(0,1) == "R"){

    connection.query("select cond from vehiclereport where location = ? order by time desc limit 3",loc,function(err,result){
      //console.log("result:" + result);

      if(result != ""){
        //console.log("Im inside the computer. Time to put on the ski mask.");

        var jesuschrist = JSON.stringify(result);

        console.log("The most recent three reports are :\n" + jesuschrist);
      }
      else{
        console.log("There are no recent reports of that area.");
      }
      console.log("END OF PROGRAM");
      process.exit();

      return;
    });
  }
});
