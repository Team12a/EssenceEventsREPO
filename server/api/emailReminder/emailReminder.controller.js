'use strict';

import config from '../../config/environment';
import User from '../user/user.model';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

/*
  For this emailReminder to work, the sendgrid email account should be in development.js
  It should follow this format:

  essEventsReminderEmail:{
    email:{
      address: 'EmailAddress@example.com',
      user: 'EmailUsername',
      password: 'Emailpassword'
    },
    auth:{
      api_user: 'SendgridUsername',
      api_key: 'SendgridPassword'
    }
  }
*/

export function emailReminder(req, res){
  //Creates transporter using sendgrid
  var transporter = nodemailer.createTransport(sgTransport(config.essEventsReminderEmail.options));
  //Design the email
  var mailOptions = {
    from: config.essEventsReminderEmail.email.address,
    to: 'o9dangson@gmail.com',//Replace this with user email
    subject: 'ToDo List Reminder for ',// + User
    html: '<p>"PUT TO DO LIST HERE"</p>'
  };

  //Send the email itself
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      throw error;
      res.status(400).end();
    }
    else {
      res.send('Message sent: ' + info.response);
    }
  });
}
