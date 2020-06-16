//importing the server.. which is made in server.js
const server = require('./server.js');
//declaring the port which the server will run on
const port = 8000;
//making sure the port is working..and not taken up..
server.listen(port, () => {
    console.log(`listening on port ${port}.. good work`)
})