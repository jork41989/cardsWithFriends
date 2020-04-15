const express = require("express");
const app = express();
const db = process.env.MONGO_URI || require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
var http = require("http");
const io = require('socket.io')(http);
const users = require("./routes/api/users");
const server = http.createServer(app);




if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}



mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!!"));

app.use(passport.initialize());
require('./config/passport')(passport);

io.on('connection', function (socket) {
  console.log('user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  // receiving signal from one connection on button pressed with sort data
  socket.on('sortBy', function (sort) {
    console.log('button to sort by ' + sort + ' was pressed.');
    // emmiting signal to all connections with sort data
    io.emit('sortBy', sort);
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 5000;
server.listen(port || 7777, function () {
  console.log(`Server is running on port ${port}`);
});