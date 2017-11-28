'use strict'

// copy this file and create a 'development.js'
// fill in the missing data

module.exports = {
  mongo: {
    uri: 'insert mongo uri here'
  },
  essEventsEmail: {
    address: 'insert email address here',
    user: 'insert email address username here',
    password: 'insert email address password here'
  },
  essEventsReminderEmail:{
    email: {
      address: 'insert email address here',
      user: 'insert email address username here',
      password: 'insert email address password here'
    },
    options: {
      auth: {
        api_user: 'insert api user name here',
        api_key: 'insert api key here'
      }
    }
  },
  seedDB: true
};
