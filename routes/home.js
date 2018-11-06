const express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/', function(req, res) {
  res.render('home');
})
app.get('/home', function(req, res) {
  res.render('home');
})
module.exports= app;
