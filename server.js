var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var io = require('socket.io');
var bcrypt = require('bcrypt');
var path = require('path');
var jwt = require('jsonwebtoken');
var port = 2090 || process.env.PORT;
var morgan = require('morgan');
var cookie = require('cookie');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/client')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app, bcrypt, io, jwt, cookie);

app.listen(port, function(req, res){
  console.log("Taskverse is running on port " + port);
});
