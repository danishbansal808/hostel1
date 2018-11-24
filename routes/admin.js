const express = require('express');
const mysql = require('mysql');
const fileupload = require('express-fileupload');
const connection = require('./connection');
const loginadmin = require('./loginadmin');
var app = express();
app.use(fileupload());
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/admin', function(req, res) {
  res.render('adminpage');
});
app.get('/edithomepage', function(req, res) {
  res.render('edithomepage');
});
app.get('/managecomplaints', function(req, res) {
  var sql = 'SELECT * FROM `complaints` WHERE 1';
  connection.getConnection(function(err) {
    if (err) throw err;
    console.log('connect');
    connection.query(sql, function(err, row, fields) {
      if (err) throw err;
       res.render('managecomplaints',{datas:row});
    });
  });
  //res.render('managecomplaints');
});
app.get('/managecontacts', function(req, res) {
  res.render('managecontacts');
});
app.get('/managenews', function(req, res) {
  res.render('managenews');
});

app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length ==
    0) {
    return res.status(400).send('No files were uploaded.');
  }
  let sampleFile = req.files.sampleFile;
  sampleFile.mv('assets/homeuploads/maingallery.jpg', function(err) {
    if (err) return res.status(500).send(err);
  });
  res.render('edithomepage');
});
module.exports= app;
