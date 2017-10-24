'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('superAdmin.manageEvent', {
        url: '/manageEvent',
        templateUrl: 'app/superAdmin/partials/manageEvent/manageEvent.html',
        controller: 'ManageEventCtrl',
        authenticate: 'superAdmin'
      });
  });
