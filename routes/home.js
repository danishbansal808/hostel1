const express = require('express');
const fs = require('fs');
var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/', function(req, res) {
  res.render('home');
})
app.get('/home', function(req, res) {
  res.render('home');
})
fs.readFile('./assets/homepage/paragraph.txt','utf8',function(error,data){
  if(error)
  {
    console.log(error);
  }
  else
  {
    console.log(data);
  }
})
module.exports= app;
