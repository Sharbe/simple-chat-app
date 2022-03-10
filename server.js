var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http');
var socketIo = require('socket.io');
require('dotenv/config');

var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Import routes
const messagesRoutes = require('./routes/messages')

// Use routes
app.use('/messages', messagesRoutes);

// Connect to DB
mongoose.connect(process.env.DATABASE_URL,
    (err, db) => {
        console.log("Connected to DB");
    }
)

// Socket IO
var httpServer = http.Server(app);
var io = socketIo(httpServer);
app.set('socketio', io);

io.on('connection', () =>{
    console.log('A user just connected');
}) 

var server = httpServer.listen(3000, () => {
    console.log("This server is running on port " + server.address().port)
})
