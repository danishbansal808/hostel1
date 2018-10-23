const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const fileupload = require('express-fileupload');
const id = require('crypto-random-string');
const date = require('date-and-time');
/*---------------------------------------------------------------------------*/
var app=express();
app.use(fileupload());
var connection = mysql.createPool({
  connectionLimit:30,
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'test3'
});
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bandabhadurhostel@gmail.com',
    pass: 'D@nish123'
  }
});
var urlencodedParser = bodyParser.urlencoded({ extended: false },
  function(err, client) {
    if (err) {
      console.log("err");
    }
    console.log('connect!!!');
  });
  let now = new Date();
date.format(now, 'YYYY/MM/DD');
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.get('/',function(req,res){
  res.render('home');
});
app.get('/home',function(req,res){
  res.render('home');
});
app.get('/contact',function(req,res){
  res.render('contact');
});
app.get('/complaints',function(req,res){
  res.render('complaints',{qs: req.query});
});
app.post('/complaints',urlencodedParser,function(req,res){
  var name=req.body.uname,
      email=req.body.email,
      phone=req.body.pnumber,
      block=req.body.block,
      floor=req.body.floor,
      room=req.body.room,
      complaint=req.body.complainttype,
      description=req.body.Description,
      date=Date.now();
      uid=id(8);
  var stmnt=`INSERT INTO complaints(Name, Email, Contact, Block, Floor, Room, Complaints, Description, Date, ID) VALUES (?,?,?,?,?,?,?,?,?,?)`;
  var alldata=[name,email,phone,block,floor,room,complaint,description,date,uid];
  var mailOptions = {
  from: 'bandabhadurhostel@gmail.com',
  to: email,
  subject: 'Query Recieved',
  text: `Thanks For Contacting Us ! We will Reply you soon
  your complaint is about ---> ${complaint}
   and
   description is-----> ${description}
    Your unique id is----> ${uid}
    please use it for future refrence`
};

 connection.getConnection(function(err,tempcount){
    if(!!err){
      console.log("error");
    }else{
      transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
      console.log("connected");
    }
});
connection.query(stmnt  , alldata ,function(err,row,fields){
  if(!!err){
    console.log(err);
  }else{
    console.log("Data inserted successfully");
    res.render('complaints-success',{data: req.body,uid});
  }
})
});
app.get('/news',function(req,res){
  res.render('news');
});
app.get('/admin',function(req,res){
  res.render('adminpage');
});
app.get('/admin/edithomepage',function(req,res){
  res.render('edithomepage');
});
app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let sampleFile = req.files.sampleFile;
  sampleFile.mv('assets/.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
app.post('/searchdata',urlencodedParser,function(req,res){
  var id=req.body.uid;
  console.log(id);
  console.log(now);
var sql = 'SELECT * FROM complaints WHERE ID = ?';
connection.getConnection(function(err){
  if (err) throw err;
  console.log('connect');
connection.query(sql, id,function(err,result){
  if (err) throw err;
  res.send(result);
  console.log(result);
});
});
});
app.listen(3000);
