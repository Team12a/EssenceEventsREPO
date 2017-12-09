/**
 * Main application file
 */

'use strict';

const express = require("express");
const mongoose = require ("mongoose");
mongoose.Promise = require('bluebird');
const config = require("./config/environment");
const http = require("http");
//EmailReminder
var emailReminder = require('./api/emailReminder/emailReminder.js');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
  //Start the CronJob
  emailReminder.loop_job.start();
  console.log('loopJob status', emailReminder.loop_job.running); // loopJob status true if running
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
