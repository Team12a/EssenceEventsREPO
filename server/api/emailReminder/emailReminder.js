'use strict';

import config from '../../config/environment';
import User from '../user/user.model';
import Event from '../event/event.model';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const CronJob = require('cron').CronJob;
//Temp
var counter = 0;
var br = '################################\n';
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


var loopJob = new CronJob({
  cronTime: '* * * * * *', //Modify values as needed.
  //Describes what actions are taken after each interval
  onTick: function() {
          //Temp
          console.log('\nRunning Send Notifications Worker every 1 seconds');
          counter = counter + 1;
          //Creates transporter using sendgrid
          var transporter = nodemailer.createTransport(sgTransport(config.essEventsReminderEmail.options));
          //For each toDoList item, checks if finished, if not, send email to corresponding user email
          //If null (aka. no events/toDoList), do nothing
          Event.find({ "toDoList" : { $elemMatch: {done:false}}}, function(err, events){
              if(err) throw err;
              else{
                console.log(events);
              }
          });

                    //Check if Date is passed
                    //If Date is upcoming
                    //placeholder email
                  //Email Template
          /*var emailReminderTemplate = transporter.templateSender(
            {
            subject: 'Testing reminder for {{username}}!',
            html: `<p><b>Email Address:</b> <strong>{{emailAddress}}</strong></p>
                  <p><b>ToDOLIST ITEM:</b> {{todoListItem}}</p>
                  <br>
                  <p>Email Number {{counter}}</p>`
            }, {
              from: config.essEventsReminderEmail.email.address,
          });

          // use template based sender to send a message
          emailReminderTemplate(
            { to: config.essEventsReminderEmail.email.address}, //Place Sender Email here. For testing purposes, send to itself.
            {
              username: '<Insert User Here>',
              emailAddress: '<Insert User Email Here>',
              todoListItem: 'SampleToDoListItem',
              counter: counter,
            },
            function(err, info){
              if(err){
                console.log('Error');
                throw error;
                res.status(400).end();
              }else{
                console.log('Email reminder sent');
              }
            }
          );*/

          //  }



        },
  start: false
});

module.exports = {
  loop_job: loopJob
};
//loop.start();
//console.log('loopJob status', loopJob.running); // loopJob status true
