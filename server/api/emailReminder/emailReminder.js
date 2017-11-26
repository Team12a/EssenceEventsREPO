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


var br = '################################';
var bool = false;

var loopJob = new CronJob({
  cronTime: '00 03 11 ** 0-6', //Modify values as needed.
  //Describes what actions are taken after each interval
  onTick: function() {
          //Temp
          console.log(br);
          console.log(br);
          console.log(br);
          console.log('Running Send Notifications Worker every 5 seconds');
          //Creates transporter using sendgrid
          var transporter = nodemailer.createTransport(sgTransport(config.essEventsReminderEmail.options));
          //Email Templates
          var upcomingTemplate = transporter.templateSender(
            {
            subject: 'EssenceEvents Email Reminder for {{emailAddress}}!',
            html: `<table>
                    <tr bgcolor="#EDC4D6">
                      <th><h1><img src="http://essenceevents.net/assets/images/EELogoIMG.png" width="50" height="50" alt="Essence Events" align ="center" /> Email Reminder</h1></th>
                      </tr>
                      <tr>
                        <td><h3>Hello <b>{{username}},</b></h3>
                              <p>       You have an upcoming due date for <b>{{todoListItem}}</b> on <b>{{todoListDate}}</b>.</p></td>
                      </tr>
                      <tr bgcolor="#EDC4D6">
                        <td align="center"><h3>Essence Events.</h3></td>
                      </tr>
                  </table>`
            }, {
              from: config.essEventsReminderEmail.email.address,
          });
          var passedTemplate = transporter.templateSender(
            {
            subject: 'EssenceEvents Passed Due Email Reminder for {{emailAddress}}!',
            html: `<table>
                    <tr bgcolor="#EDC4D6">
                      <th><h1><img src="http://essenceevents.net/assets/images/EELogoIMG.png" width="50" height="50" alt="Essence Events" align ="center" /> Email Reminder</h1></th>
                      </tr>
                      <tr>
                        <td><h3>Hello <b>{{username}},</b></h3>
                              <p>       Your unfinished task, <b>{{todoListItem}}</b>, has passed its due date on <b>{{todoListDate}}</b>.</p></td>
                      </tr>
                      <tr bgcolor="#EDC4D6">
                        <td align="center"><h3>Essence Events.</h3></td>
                      </tr>
                  </table>`

            }, {
              from: config.essEventsReminderEmail.email.address,
          });
          var passedPaymentTemplate = transporter.templateSender(
            {
            subject: 'EssenceEvents Passed Due Payment Email Reminder for {{emailAddress}}!',
            html:
                  `<table>
                          <tr bgcolor="#EDC4D6">
                            <th><h1><img src="http://essenceevents.net/assets/images/EELogoIMG.png" width="50" height="50" alt="Essence Events" align ="center" /> Email Reminder</h1></th>
                            </tr>
                            <tr>
                              <td><h3>Hello <b>{{username}},</b></h3>
                                    <p>       Your payment for <b>{{payment}}</b>, needed for the event, <b>{{eventName}}</b>, has passed its due date on <b>{{dueDate}}</b>.</p></td>
                            </tr>
                            <tr bgcolor="#EDC4D6">
                              <td align="center"><h3>Essence Events.</h3></td>
                            </tr>
                        </table>`
            }, {
              from: config.essEventsReminderEmail.email.address,
          });
          var passedAdminTemplate = transporter.templateSender(
            {
            subject: 'SuperAdmin Event Reminder for Erma Sams!',
            html:
                  `<table>
                          <tr bgcolor="#EDC4D6">
                            <th><h1><img src="http://essenceevents.net/assets/images/EELogoIMG.png" width="50" height="50" alt="Essence Events" align ="center" /> Email Reminder</h1></th>
                            </tr>
                            <tr>
                              <td><h3>Hello Erma,</h3>
                                    <p>       <b>{{username}}</b> has an uncompleted task,<b>{{todoListItem}}</b>, for the event, <b>{{eventName}}</b>, that has passed it's due date on <b>{{todoListDate}}</b>.</p></td>
                            </tr>
                            <tr bgcolor="#EDC4D6">
                              <td align="center"><h3>Essence Events.</h3></td>
                            </tr>
                        </table>`

            }, {
              from: config.essEventsReminderEmail.email.address,
          });
          var passedAdminPaymentTemplate = transporter.templateSender(
            {
            subject: 'SuperAdmin Payment Reminder for Erma Sams!',
            html:
                  `<table>
                          <tr bgcolor="#EDC4D6">
                            <th><h1><img src="http://essenceevents.net/assets/images/EELogoIMG.png" width="50" height="50" alt="Essence Events" align ="center" /> Email Reminder</h1></th>
                            </tr>
                            <tr>
                              <td><h3>Hello Erma,</h3>
                                    <p>       <b>{{username}}</b> has missed a payment, <b>{{payment}}</b>, for the event, <b>{{eventName}}</b>, that was due on <b>{{dueDate}}</b>.</p></td>
                            </tr>
                            <tr bgcolor="#EDC4D6">
                              <td align="center"><h3>Essence Events.</h3></td>
                            </tr>
                        </table>`

            }, {
              from: config.essEventsReminderEmail.email.address,
          });
          //Current Date
          var now = moment();
          bool = false; //Get rid of this later. Only for testing purposes.

          //For each toDoList item, checks if finished, if not, send email to corresponding user email
          //If null (aka. no events/toDoList), do nothing

          //This code line will give all events that meets requirements (including past events from previous grunt serve)
          Event.find( { "toDoList":{$elemMatch:{done:false}} } ).exec(function(err, events){
             if(err) throw err;
             else{
                  console.log(events.length);
                  console.log(br);
                  events.forEach(function(thing){
                    //Find and convert it to an array with .exec
                    Event.find({"_id": thing.id}).exec(function(err, thingArray){
                      console.log(thingArray[0].name);
                      User.find({"_id": thingArray[0].userId}).exec(function(err, eventUser){
                        if(err) throw err;
                        else if(eventUser.length>0){
                          console.log('..\t' + eventUser[0].name + '\t' + thingArray[0].name);
                        }
                      });
                      //This makes sure the code only runs if user exists
                      // Also gets rid of events from previous grunt serve.
                      User.find({"_id": thingArray[0].userId}).exec(function(err, eventUser){
                        if(err) throw err;
                        else if(eventUser.length>0){
                          var eventDate = moment(thingArray[0].date);
                          console.log(br);
                          console.log(thing.name + '\t' + eventDate.format('MMMM Do YYYY, h:mm:ss a'));  //Works
                          console.log(thingArray[0].toDoList.length); //THIS WORKS

                          thingArray[0].toDoList.forEach(function(item){
                            console.log('...\t\t' + item.todo + '\t' + item.by);
                            //Compares Dates
                            var itemDate = moment(item.by);
                            var dateDiff = itemDate.diff(now, 'm');   //Checks if Todo Date is passed. <0 means
                            var eventDiff = eventDate.diff(now,'m');  //Checks if Event Date is passed.
                            //EventDiff > 0 guarantees we're looking at upcoming events only
                            //If Date is passed
                            if(!item.done && dateDiff <= 0 && dateDiff > -4320 && thingArray[0].userId != null && eventDiff > 0){
                              console.log('....\tPassed\t\tDate Diff (m): ' + dateDiff + '\tEventDiff (m):' +eventDiff);
                              // use template based sender to send a message
                              passedTemplate(
                                { to: config.essEventsReminderEmail.email.address}, //Place Sender Email here. For testing purposes, send to itself.
                                {
                                  username: eventUser[0].name,
                                  emailAddress: eventUser[0].email,
                                  todoListItem: item.todo,
                                  todoListDate: item.by
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
                              //Send Email to SuperAdmin as well
                              passedAdminTemplate(
                                { to: config.essEventsReminderEmail.email.address}, //Place Sender Email here. For testing purposes, send to itself.
                                {
                                  username: eventUser[0].name,
                                  eventName: thingArray[0].name,
                                  todoListItem: item.todo,
                                  todoListDate: item.by
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
                            else if (!item.done && dateDiff > 0 && thingArray[0].userId != null && eventDiff > 0){
                              console.log('....\tUpcoming\t\tDate Diff (m): ' + dateDiff + '\tEventDiff (m):' +eventDiff);
                              // use template based sender to send a message
                              upcomingTemplate(
                                { to: config.essEventsReminderEmail.email.address}, //Place Sender Email here. For testing purposes, send to itself.
                                {
                                  username: eventUser[0].name,
                                  emailAddress: eventUser[0].email,
                                  todoListItem: item.todo,
                                  todoListDate: item.by
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
                          });
                        }
                      });
                      /////////////////////////////////////////////////////////////////
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

//console.log('loopJob status', loopJob.running); // loopJob status true, use this to check if it's running

