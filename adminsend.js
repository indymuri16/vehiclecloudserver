//obtained query from the user
var sender = "912380678";

var io = require('socket.io-client');
var socket = io('http://localhost:8000',{query: sender});
//Taking out the following line:
//var ioClient = io.connect('http://localhost:8000');


socket.on('foo', function(msg) { //Changed ioClient to socket
  console.info(msg);
  if(msg.substr(0,1) == "S"){
    console.log("END OF PROGRAM");
   process.exit();
  }
});
