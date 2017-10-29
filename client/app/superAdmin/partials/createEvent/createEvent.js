'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('superAdmin.createEvent', {
        url: '/createEvent/',
        params: {
          userID: 'undefined',
          usersName: 'undefined'
        },
        templateUrl: 'app/superAdmin/partials/createEvent/createEvent.html',
        controller: 'CreateEventCtrl',
        authenticate: 'super'
      });
  });
