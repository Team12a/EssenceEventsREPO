'use strict';

angular.module('essenceEventsRepoApp.admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.createPayment', {
        url: '/createPayment/',
        params: {
          userID: 'undefined',
          usersName: 'undefined'
        },
        templateUrl: 'app/admin/partials/createPayment/createPayment.html',
        controller: 'CreatePaymentCtrl',
        authenticate: 'admin'
      });
  });
