
  'use strict';

  angular.module('essenceEventsRepoApp.client')
    .config(function ($stateProvider) {
      $stateProvider
        .state('client.paypal', {
          url: '/makePayment/',
          params: {
            payment: 'undefined'
          },
          templateUrl: 'app/client/partials/makePayment/paypal.html',
          controller: 'paypalCtrl',
          authenticate: 'user'
        });
    });
