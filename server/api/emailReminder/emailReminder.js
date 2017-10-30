'use strict';

import config from '../../config/environment';
import User from '../user/user.model';
import Event from '../event/event.model';
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
  cronTime: '05 * * * * *',
  //Describes what actions are taken after each interval
  onTick: function() {
          //Temp
          console.log('Running Send Notifications Worker every 5 seconds');
          counter = counter + 1;
          //Creates transporter using sendgrid
          var transporter = nodemailer.createTransport(sgTransport(config.essEventsReminderEmail.options));
          //For each toDoList item, checks if finished, if not, send email to corresponding user email
          //If null (aka. no events/toDoList), do nothing
          Event.findAsync({$where: "this.toDoList.length > 0"},function(err, doc){
            console.log(doc);
            if(doc != null){
              doc.forEach(function(err, cursor){  //For each event
                //var arrLength = cursor.toDoList.size;
                //console.log(arrLength);
                cursor.toDoList.forEach(function(err, toDoItem){
                  if(!toDoItem.done){
                    var toDoEmail;
                    User.findAsync({name: cursor.userId}, function(err, user){
                      toDoEmail = user.email.type;
                    });
                    //Check if Date is passed
                    //If Date is upcoming
                    //placeholder email
                    var mailOptions = {
                      from: config.essEventsReminderEmail.email.address,
                      to: 'o9dangson@gmail.com',  //Corresponding User
                      subject: 'Testing Email #' + counter + ' for user: ' + cursor.userId,
                      html: `<h2>Email address: ${toDoEmail}</h2>
                            <p><b>To Do List Item:</b> ${toDoItem.todo}</p>`
                    };
                    //Send the email itself
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        throw error;
                        res.status(400).end();
                      }
                      else
                        console.log('Message sent: ' + info.response);
                    });
                  }
                });
              });
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
