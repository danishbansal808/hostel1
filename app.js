const express = require('express');
const home = require('./routes/home');
const contact = require('./routes/contact');
const complaints = require('./routes/compliants');
const news = require('./routes/news');
const admin = require('./routes/admin');
const loginadmin = require('./routes/loginadmin');
const signup = require('./routes/signup');
var app = express();
const port=process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/', home)
app.get('/home', home)
app.get('/contact', contact)
app.get('/complaints', complaints)
app.post('/complaints',complaints)
app.post('/searchdata',complaints)
app.get('/news',news)
app.get('/admin',admin)
app.get('/edithomepage',admin)
app.get('/managecomplaints', admin)
app.get('/managecontacts',admin)
app.get('/managenews',admin)
app.post('/upload',admin)
app.get('/loginadmin',loginadmin)
app.post('/loginadmin',loginadmin)
app.get('/adminpage',loginadmin)
app.get('/count',loginadmin)
app.get('/signup',signup)
app.post('/signup',signup)
app.listen(port);
console.log(port);
console.log(Date.now());
