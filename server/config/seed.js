/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
//changed super admin info 
'use strict';
import User from '../api/user/user.model';

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test',
      role: 'user',
      phoneNumber: '555-555-5555'
    },/*created super admin for testing*/{
      provider: 'local',
      role: 'super',
      name: 'Super A',
      email: 'superA@example.com',
      password: 'super',
      phoneNumber:'111-111-1111'
    },{
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin',
      phoneNumber: '555-555-5555'
    }, {
      provider: 'local',
      name: 'User1',
      email: 'user1@example.com',
      password: 'pass',
      role: 'user',
      phoneNumber: '555-555-5555'
    }, {
      provider: 'local',
      name: 'User2',
      email: 'user2@example.com',
      password: 'pass',
      role: 'user',
      phoneNumber: '555-555-5555'
    }, {
      provider: 'local',
      name: 'User3',
      email: 'user3@example.com',
      password: 'pass',
      role: 'user',
      phoneNumber: '555-555-5555'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
