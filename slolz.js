//This is the server code
//Run clientlol and servalol in two seperate cmd's and itll work
//must install socket.io and socket.io-client

var  io = require('socket.io')();
var  ioServer = io.listen(8000);
var  sequence = 1;
var  clients = [];

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '4200',
  user     : 'root',
  password : 'nevergonnagiveliuup',
  database : 'liu'
});

connection.connect();

var curCli = 0;

var loca = "", //location
    id = "", //id number
    rqt = "", //request type
    misc = ""; //miscellaneous data


//Temp variables for the vehicle end
var ti = "",
    iv = "",
    lo = "",
    co = "";

var loc = "";
//Counters for how many we have serviced- clients and vehicles respectively
var cc = 0;
var vc = 0;
var ac = 0;

var isCli = true; //tells if it is a vehicle or client
var isAdmin = false; //tells if it is admin or not

var parsedStrings = "";

io.use(function(socket, next){

    //console.log("Query/Report: ", socket.handshake.query);
    var qOBJ = socket.handshake.query;

    longqSTR = JSON.stringify(qOBJ)


    //CLIENT QUERIES ARE HERE
    if(longqSTR.charAt(2) == 0)
    {
      console.log("Client");
      isCli = true;
      isAdmin = false;
      usableportion = longqSTR.substr(3,12);
      //console.log(usableportion);

      var buff = new Buffer(usableportion.length);
      buff.write(usableportion);


      loca = buff.slice(0,6); //locH = location temporary storage
      id = buff.slice(6,8); //id #
      rqt = buff.slice(8,9); //request type
      misc = buff.slice(9,12);
      ti = Math.round(+new Date()/1000); //timestamp in seconds

    var article = {
        time: ti,
        id: id,
        location: loca,
        requesttype: rqt,
        misc: misc
    }

    cc++;

    var query = connection.query('insert into clientqueries set ?', article, function(err,result){
      if (err){
        //console.error(err);
        return;
      }
      //console.error(result);
    });


      parsedStrings = "Recieved Client Query";
      //console.log("Client query: \n" + parsedStrings);
      console.log("Recieved Client Query\n");
  }

//ADMIN TIME
  else if(longqSTR.charAt(2) == 9)
  {
    console.log("Admin");
    isCli = false;
    isAdmin = true;
    usableportion = longqSTR.substr(3,8);
    //console.log(usableportion);

    var buff = new Buffer(usableportion.length);
    buff.write(usableportion);


    loc = buff.slice(0,6); //locH = location temporary storage
    id = buff.slice(6,8); //id #
    ti = Math.round(+new Date()/1000); //timestamp in seconds

  var lolioswagmoney = {
    time: ti,
    destination: loc,
    id: id,
    completed: 0
  }

  ac++;

  var query = connection.query('insert into destinations set ?', lolioswagmoney, function(err,result){
    if (err){
      //console.error(err);
      return;
    }
    //console.error(result);
  });



    parsedStrings = "Sending the vehicle";
    //console.log("Client query: \n" + parsedStrings);
    console.log("Will send " + id + " to " + loc + "\n");
}

  //VEHICLE REPORTS GO HERE
  else{
    console.log("Vehicle");
    usableportion = longqSTR.substr(3,10);
    //console.log(usableportion);

    isCli = false;
    isAdmin = false;

    var buff = new Buffer(usableportion.length);
    buff.write(usableportion);

    var eid = buff.slice(0,5);

    if(eid != "EIO\":"){

    lo = buff.slice(0,6); //locH = location temporary storage
    iv = buff.slice(6,8); //id #
    co = buff.slice(8,10)//condition
    ti = Math.round(+new Date()/1000); //timestamp in seconds

    vc++;

  }

  var vehrep = {
      time: ti,
      id: iv,
      location: lo,
      cond: co,
  }

  var yoloswaggins = {
    time: ti,
    id: iv,
    location: lo
  }

  connection.query('insert into vehiclereport set ' + vehrep , function(err,result){
    if (err){
      //console.error(err);
      return;
    }
    //console.error(result);
    return;
  });


  /**
  connection.query('delete from table vehlocations; insert into vehlocations set ' + yoloswaggins, function(err,result){
    if (err){
      //console.error(err);
      return;
    }
    //console.error(result);
    return;
  });
  */


  parsedStrings = "Recieved Vehicle Report";
  console.log(parsedStrings+ "\n");
}

    next();
});

// Event fired every time a new client connects:
ioServer.on('connection', function(socket) {



    if(isCli == true && isAdmin == false){
      console.info('New Client connected (id=' + socket.id + ').\n');
    }
    else if(isAdmin = true && isCli == false){
      console.info('New Admin connected (id=' + socket.id + ').\n');
    }
    else if(isAdmin = false && isCli == false){
      console.info('New Vehicle connected (id=' + socket.id + ').\n');
    }
    clients.push(socket);

    // When socket disconnects, remove it from the list:
    socket.on('disconnect', function() {
        var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            if(isCli == true && isAdmin == false){
              console.info('Client gone (id=' + socket.id + ').\n');
            }
            else if(isAdmin == true && isCli == false){
              console.info('Admin gone (id=' + socket.id + ').\n');
            }
            else if(isAdmin == false && isCli == false){
              console.info('Vehicle gone (id=' + socket.id + ').\n');
            }
        }
    });
});



//this algorithm will change- it currently sends the parsed data to a random client
setInterval(function() {
    var randomClient = 0;
    if (clients.length > 0) {
      for(i = 0; i < clients.length; i++){
        typeof(i);

        clients[i].emit('foo', parsedStrings);
      }
    }
}, 0);
