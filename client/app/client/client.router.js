'use strict';

angular.module('essenceEventsRepoApp.client')
  .config(function($stateProvider) {
    $stateProvider
      .state('client', {
        url: '/client',
        templateUrl: 'app/client/client.html',
        controller: 'ClientController',
        controllerAs: 'client',
        authenticate: 'user'
      });
  });
