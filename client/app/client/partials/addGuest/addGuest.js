'use strict';

angular.module('essenceEventsRepoApp.client')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.addGuest', {
        url: '/addGuest',
        templateUrl: 'app/client/partials/addGuest/addGuest.html',
        controller: 'AddGuestCtrl',
        authenticate: 'user'
      });
  });
