'use strict';

import config from '../../config/environment';
//import User from '../user/user.model';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const CronJob = require('cron').CronJob;
//Temp
var counter = 0;

/*
  For this emailReminder to work, the sendgrid email account should be in development.js
  It should follow this format:

  essEventsReminderEmail:{
    email:{
      address: 'EmailAddress@example.com',
      user: 'EmailUsername',
      password: 'Emailpassword'
    },
    options:{
      auth:{
        api_user: 'SendgridUsername',
        api_key: 'SendgridPassword'
      }
    }
  }
*/
/*

*/
var loopJob = new CronJob({
  cronTime: '02 * * * * *',
  //Describes what actions are taken after each interval
  onTick: function() {
          //Temp
          console.log('Running Send Notifications Worker every 2 seconds');
          counter = counter + 1;

          //Creates transporter using sendgrid
          var transporter = nodemailer.createTransport(sgTransport(config.essEventsReminderEmail.options));
          //Design the email
          var mailOptions = {
            from: config.essEventsReminderEmail.email.address,
            to: 'o9dangson@gmail.com',  //Corresponding User
            subject: 'Testing Email #' + counter,
            html: '<h2>This is the Email</h2>'
          };
          //Send the email itself
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              throw error;
              res.status(400).end();
            }
            else {
              console.log('Message sent: ' + info.response);
            }
          });
        },
  start: false
});

module.exports = {
  loop_job: loopJob
};
//loop.start();
//console.log('loopJob status', loopJob.running); // loopJob status true
