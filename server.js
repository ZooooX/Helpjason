require('dotenv').config()

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

//express server
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
  );
  next();
});


app.use(express.static('public'));

const apiRoutes = require("./app/routes");

app.use('/api', apiRoutes);

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});


//sockets
var io = require('socket.io')(server);

io.on("connection", (socket) => {
  console.log("A user connected !");
});

//Mongodb 
const mongoose = require('mongoose');
const Member = require('./app/models/member.model');
const MemberService = require('./app/services/MemberService');

const memberServiceInstance = new MemberService();

mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology:true})
  .then(() => {
    console.log("Successfully connected to database");
    Member.watch().on("change", () => {
      memberServiceInstance.getAll().then((data)=>{
        io.emit('dataChange', {data:data});
      }).catch((err) =>{
        console.log(err);
      });
    });    
  }).catch((err) => {
    console.log('Error connecting to db', err);
    process.exit();
  });



