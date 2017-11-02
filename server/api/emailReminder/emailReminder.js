'use strict';

import config from '../../config/environment';
import User from '../user/user.model';
import Event from '../event/event.model';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var moment = require('moment');
const CronJob = require('cron').CronJob;

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

var br = '################################\n';


var loopJob = new CronJob({
  cronTime: '* * * * * *', //Modify values as needed.
  //Describes what actions are taken after each interval
  onTick: function() {
          //Temp
          console.log('\nRunning Send Notifications Worker every 1 seconds');
          //Creates transporter using sendgrid
          var transporter = nodemailer.createTransport(sgTransport(config.essEventsReminderEmail.options));
          //Email templates
          var upcomingTemplate = transporter.templateSender(
            {
            subject: 'Testing reminder for {{username}}!',
            html: `<p>Hello, <b>{{username}},</b></p>
                  <p>       You have upcoming an upcoming due date for <b>{{todoListItem}}</b> on <b>{{todoListDate}}</b>.</p>`
            }, {
              from: config.essEventsReminderEmail.email.address,
          });
          var passedTemplate = transporter.templateSender(
            {
            subject: 'Testing reminder for {{username}}!',
            html: `<p>Hello, <b>{{username}},</b></p>
                  <p>       You have upcoming an upcoming due date for <b>{{todoListItem}}</b> on <b>{{todoListDate}}</b>.</p>`
            }, {
              from: config.essEventsReminderEmail.email.address,
          });
          //Current Date
          var now = moment();


          //For each toDoList item, checks if finished, if not, send email to corresponding user email
          //If null (aka. no events/toDoList), do nothing
          Event.find( { "toDoList":{$elemMatch:{done:false}} } ).exec(function(err, events){
             if(err) throw err;
             else{
                  console.log(events.length);
                  console.log(br);
                  events.forEach(function(thing){
                    //Find and convert it to an array with .exec
                    Event.find({"_id": thing.id}).exec(function(err, thingArray){
                      console.log(br + thing.id);  //Works
                      console.log(thingArray[0].toDoList.length); //THIS WORKS
                      thingArray[0].toDoList.forEach(function(item){
                        console.log(item.todo + '\t' + item.by);
                        //Check if Date is passed
                        var itemDate = moment(item.by);
                        var dateDiff = itemDate.diff(now, 'd');
                        console.log('Date Diff: ' + dateDiff);
                        if(dateDiff <= 0 && thingArray[0].userId != null){  //If the event doesn't contain a user for whatever reason
                        // use template based sender to send a message
                        upcomingTemplate(
                          { to: config.essEventsReminderEmail.email.address}, //Place Sender Email here. For testing purposes, send to itself.
                          {
                            username: thingArray[0].userId,
                            emailAddress: '<Insert User Email Here>',
                            todoListItem: 'SampleToDoListItem',
                            todoListDate: 'SampleDueDate'
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
                        );
                        }
                        //If Date is upcoming
                        else{

                        }
                      });
                    });
                  });
            }
         });


          //Check if Date is passed
          //If Date is upcoming
          //placeholder email
          //Email Template
          // var emailReminderTemplate = transporter.templateSender(
          //   {
          //   subject: 'Testing reminder for {{username}}!',
          //   html: `<p>Hello, <b>{{username}},</b></p>
          //         <p>       You have upcoming an upcoming due date for <b>{{todoListItem}}</b> on <b>{{todoListDate}}</b>.</p>`
          //   }, {
          //     from: config.essEventsReminderEmail.email.address,
          // });
          //
          // // use template based sender to send a message
          // emailReminderTemplate(
          //   { to: config.essEventsReminderEmail.email.address}, //Place Sender Email here. For testing purposes, send to itself.
          //   {
          //     username: '<Insert User Here>',
          //     emailAddress: '<Insert User Email Here>',
          //     todoListItem: 'SampleToDoListItem',
          //     todoListDate: 'SampleDueDate'
          //   },
          //   function(err, info){
          //     if(err){
          //       console.log('Error');
          //       throw error;
          //       res.status(400).end();
          //     }else{
          //       console.log('Email reminder sent');
          //     }
          //   }
          // );

          //  }



        },
  start: false
});

module.exports = {
  loop_job: loopJob
};
//loop.start();
//console.log('loopJob status', loopJob.running); // loopJob status true
