var createError = require('http-errors');

const mongoose = require('mongoose');
var express = require('express');
var app = express();
require('dotenv').config()

//cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Route
const RouteTodo = require('./routes/todoRoute')
const RouteAuth = require('./routes/authRoute')
app.use(RouteTodo)
app.use(RouteAuth)


mongoose.connect("mongodb://localhost/kimtrongtodos",{useNewUrlParser: true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("Connection successfully");
});

app.listen(3003, function(){})