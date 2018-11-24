const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bandabhadurhostel@gmail.com',
    pass: 'D@nish123'
  }
});
module.exports=transporter;
