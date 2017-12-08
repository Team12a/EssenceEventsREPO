'use strict';

 angular.module('essenceEventsRepoApp.admin')
   .config(function ($stateProvider) {
     $stateProvider
       .state('admin.managePaymentModal', {
         url: '/managePaymentModal',
         templateUrl: 'app/admin/partials/managePayments/managePaymentsModal/managePaymentModal.html',
         controller: 'managePaymentModalCtrl',
         controllerAs: 'mancli',
         authenticate: 'admin',
       });
   });
