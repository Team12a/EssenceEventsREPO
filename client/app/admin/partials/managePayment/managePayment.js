'use strict';

angular.module('essenceEventsRepoApp.admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.managePayment', {
        url: '/managePayment',
        templateUrl: 'app/admin/partials/managePayment/managePayment.html',
        controller: 'ManagePaymentCtrl',
        authenticate: 'admin'
      });
  });
