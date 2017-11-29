'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('superAdmin.createPayment', {
        url: '/createPayment/',
        params: {
          userID: 'undefined',
          usersName: 'undefined'
        },
        templateUrl: 'app/superAdmin/partials/createPayment/createPayment.html',
        controller: 'CreatePaymentCtrl',
        authenticate: 'super'
      });
  });
