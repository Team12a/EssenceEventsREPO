'use strict';

//Initial state when logging in as super admin, routes is protected by update logic in front-end auth guards
angular.module('essenceEventsRepoApp.superAdmin')
  .config(function($stateProvider){
    $stateProvider
      .state('superAdmin', {
        url: '/superAdmin',
        templateUrl:'app/superAdmin/superAdmin.html',
        controller: 'SuperAdminController',
        controllerAs: 'superAdmin',
        authenticate: 'superAdmin'
      });
  });
