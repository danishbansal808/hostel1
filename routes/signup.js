const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const id = require('crypto-random-string')
const connection = require('./connection');
const transporter = require('./email');
const validator = require('password-validator');
var app = express();

var urlencodedParser = bodyParser.urlencoded({
  extended: false
}, function(err, client) {
  if (err) {
    console.log("err");
  }
  console.log('connect!!!');
});
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

var schema = new validator();
schema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123','QWERTYUIOP','qwertyuiop']);

app.get('/signup', function(req,res) {
  res.render('signup');
});
app.post('/signup',urlencodedParser,function(req,res){
  var email = req.body.email,
    password = req.body.password,
    repeat_password=req.body.password_repeat,
    uid = id(8);
    if(schema.validate(password)&&password===repeat_password){
    var stmnt = `INSERT INTO signup(Email, Password, Uniqueno) VALUES (?,?,?)`;
    var alldata = [email, password, uid];
    var mailOptions = {
      from: 'bandabhadurhostel@gmail.com',
      to: email,
      subject: 'signup successful',
      text: `Thanks For Signing Up !Your Email is  ---> ${email} and password is-----> ${password} Your unique id is----> ${uid} Please use it for future refrence`
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
          console.log("Signup Successfully");
          res.render('signup-success', {
                        uid
          });
        }
      })
}
else{
  var checker="Password Not right";
  res.send(checker)
}});
module.exports= app;
