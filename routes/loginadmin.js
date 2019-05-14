const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const mysql = require('mysql');
const connection = require('./connection');
var app=express();
var session;
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
app.set('view engine', 'ejs');
app.use(validator())
app.use(sessions(
  {
    secret:'^$(@&$#G$E*&$())',
    resave: 'False',
    saveUninitialized:'false',
    cookie: {
    secure: true ,
    maxAge: 60000
  }
}))
app.get('/loginadmin', function(req, res) {
  res.render('loginadmin');
})
app.post('/loginadmin',urlencodedParser,function(req, res){
  var uname=req.body.username,
      password=req.body.password;

})
module.exports=app;
