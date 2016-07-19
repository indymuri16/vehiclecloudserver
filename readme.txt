Hello!
Code created by Samuel Canner, Alexander Canner, and Ma'ayan Doron
Under the Supervision of Dr. Liu Hongbo (personal website: http://mypage.iu.edu/~hl45/)

*About the project*
This was a project for the MURI and REU program at IUPUI in 2016.
The objective of this proposal is to develop a novel paradigm for smart city surveillance running
on vehicles by leveraging the diverse vehicle-mounted sensing capabilities.


*Setup and Configuration*
This cloud server runs on node.js and mysql, so if you haven't downloaded those yet, you need to.

We installed several addons for node.js, which you will need to do as well.

What you need to do to install them,
Open the command line and type the following:

npm install socket.io
npm install socket.io-client
npm install mysql

Those frameworks are used to allow for server, client, and database communication.


MySQL setup:
port: 4200
password: nevergonnagiveliuup

Once you enter the mysql command line, you will need to enter the following lines:

CREATE DATABASE liu;
use liu;

Next look in the folder "Schemas" and copy the text inside and paste all of them into the command line.
After that you should have 4 different tables:

clientqueries
destinations
vehiclereport
vehlocations

Now you should be ready to run the server file. The server file is slolz.js
It works by communication with each program by the socket.io handshake method
Once you run that you can run every other file. Description of each:

adminloca.js: a locator of where all the current vehicles are (does not need the server to run)
adminsend.js: creates a destination for a specific vehicle to be sent to
clientlulz.js: a client that sends a query to the server and recieves the 3 most recent conditions of tha location
vehcli.js: a vehicle that sends information to the server and retrieves its next destination