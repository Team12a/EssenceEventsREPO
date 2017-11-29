'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.managePayment', {
        url: '/managePayment',
        templateUrl: 'app/superAdmin/partials/managePayment/managePayment.html',
        controller: 'ManagePaymentCtrl',
        authenticate: 'super'
      });
  });
