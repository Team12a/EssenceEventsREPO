
  'use strict';

  angular.module('essenceEventsRepoApp.client')
    .config(function ($stateProvider) {
      $stateProvider
        .state('client.addGuest', {
          url: '/addGuest/',
          params: {
            userID: 'undefined',
            usersName: 'undefined',
            event: 'undefined'
          },
          templateUrl: 'app/client/partials/addGuest/addGuest.html',
          controller: 'addGuestCtrl',
          authenticate: 'user'
        });
    });
