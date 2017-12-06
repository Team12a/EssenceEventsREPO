'use strict';

 angular.module('essenceEventsRepoApp.superAdmin')
   .config(function ($stateProvider) {
     $stateProvider
       .state('superAdmin.managePaymentModal', {
         url: '/managePaymentModal',
         templateUrl: 'app/superAdmin/partials/managePayment/managePaymentsModal/managePaymentModal.html',
         controller: 'ManagePaymentModalCtrlSuper',
         controllerAs: 'mancli',
         authenticate: 'super',
       });
   });
