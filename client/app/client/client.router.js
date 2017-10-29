'use strict';

angular.module('essenceEventsRepoApp.client')
  .config(function($stateProvider) {
    $stateProvider
      .state('client', {
        url: '/client',
        params: {
          userID: 'undefined',
          userName: 'undefined',
          events: ['=']
        },
        templateUrl: 'app/client/client.html',
        controller: 'ClientController',
        controllerAs: 'client',
        authenticate: 'user'
      });
  });
