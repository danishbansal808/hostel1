const express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/news', function(req,res) {
  res.render('news');
});
module.exports= app;
