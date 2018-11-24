const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const id = require('crypto-random-string');
const date = require('date-and-time');
const connection = require('./connection');
const transporter = require('./email');
var app = express();

var urlencodedParser = bodyParser.urlencoded({
  extended: false
}, function(err, client) {
  if (err) {
    console.log("err");
  }
  console.log('connect!!!');
});
let now = new Date();
date.format(now, 'YYYY/MM/DD HH:mm:ss');
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/complaints', function(req, res) {
  res.render('complaints', {
    qs: req.query
  });
});
app.post('/complaints', urlencodedParser, function(req, res) {
  var name = req.body.uname,
    email = req.body.email,
    phone = req.body.pnumber,
    block = req.body.block,
    floor = req.body.floor,
    room = req.body.room,
    complaint = req.body.complainttype,
    description = req.body.Description,
    date = now;
  uid = id(8);
  var stmnt = `INSERT INTO complaints(Name,
Email, Contact, Block, Floor, Room, Complaints, Description, Date, ID) VALUES (?,?,?,?,?,?,?,?,?,?)`;
  var alldata = [name, email, phone, block, floor, room, complaint, description, date, uid];
  var mailOptions = {
    from: 'bandabhadurhostel@gmail.com',
    to: email,
    subject: 'Query Recieved',
    text: `Thanks For Contacting Us ! We will Reply you soon your complaint is about ---> ${complaint} and description is-----> ${description} Your unique id is----> ${uid} Please use it for future refrence`
  };
  connection.getConnection(function(err,
    tempcount) {
    if (!!err) {
      console.log("error");
    } else {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      console.log("connected");
    }
  });
  connection.query(stmnt,
    alldata,
    function(err, row, fields) {
      if (!!err) {
        console.log(err);
      } else {
        console.log("Data inserted successfully");
        res.render('complaints-success', {
          data: req.body,
          uid
        });
      }
    })
});
app.post('/searchdata', urlencodedParser, function(req, res) {
  var id = req.body.uid;
  var sql = 'SELECT * FROM `complaints` WHERE `ID` = ?';
  connection.getConnection(function(err) {
    if (err) throw err;
    console.log('connect');
    connection.query(sql, id, function(err, row, fields) {
      if (err) throw err;
       res.render('yourcomplaint',{data:row});
    });
  });
});
module.exports= app;
