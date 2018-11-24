const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
const validator = require('express-validator');
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
}
))
module.exports=app;
