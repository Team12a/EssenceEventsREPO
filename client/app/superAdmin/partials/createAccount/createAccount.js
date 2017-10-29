'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function($stateProvider){
    $stateProvider
      .state('superAdmin.createAccount', {
        url:'/createAccount',
        // params: {
        //   userRole: 'undefined'
        // },
        templateUrl:'app/superAdmin/partials/createAccount/createAccount.html',
        controller:'CreateAccountCtrl',
        authenticate: 'super',
        controllerAs:'accCtrl'
      });
  });
