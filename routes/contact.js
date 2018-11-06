const express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/contact', function(req, res) {
  res.render('contact');
})
module.exports= app;
