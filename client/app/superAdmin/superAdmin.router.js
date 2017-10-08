'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function($stateProvider){
    $stateProvider
      .state('superAdmin', {
        url: '/superAdmin',
        templateUrl:'app/superAdmin/superAdmin.html',
        controller: 'SuperAdminController',
        controllerAs: 'superAdmin'
        //authenticate: 'superAdmin'
      });
  });
