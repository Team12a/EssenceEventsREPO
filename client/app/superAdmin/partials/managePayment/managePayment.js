'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('superAdmin.managePayment', {
        url: '/managePayment',
        templateUrl: 'app/superAdmin/partials/managePayment/managePayment.html',
        controller: 'ManagePaymentCtrlSuper',
        authenticate: 'super'
      });
  });
