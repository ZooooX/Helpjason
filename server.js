require('dotenv').config()

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const io_port = process.env.IO_PORT || 3100;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
  );
  next();
});

var io = require('socket.io')(io_port,{
  cors:{
    origin : 'http://localhost:3000'
  }
});

io.on("connection", (socket) => {
  console.log("A user connected !");
});


const mongoose = require('mongoose');
const Member = require('./app/models/member.model');
const MemberService = require('./app/services/MemberService');

const memberServiceInstance = new MemberService();

mongoose.connect('mongodb+srv://remy:helpjasonremy@helpjason.onzmj.mongodb.net/helpjason',{useNewUrlParser: true, useUnifiedTopology:true})
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

app.use(express.static('public'));

const apiRoutes = require("./app/routes");

app.use('/api', apiRoutes);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});




