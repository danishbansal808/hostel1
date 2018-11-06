const express = require('express');
const home = require('./routes/home');
const contact = require('./routes/contact');
const complaints = require('./routes/compliants');
const news = require('./routes/news');
const admin = require('./routes/admin');
var app = express();
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
app.listen(3000);
console.log(Date.now());
