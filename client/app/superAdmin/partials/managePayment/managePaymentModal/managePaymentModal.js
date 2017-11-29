'use strict';

 angular.module('essenceEventsRepoApp.superAdmin')
   .config(function ($stateProvider) {
     $stateProvider
       .state('managePaymentModal', {
         url: '/managePaymentModal',
         templateUrl: 'app/superAdmin/partials/manageAccounts/manageAccountsModal/managePaymentModal.html',
         controller: 'managePaymentModalCtrl',
         controllerAs: 'mancli',
         authenticate: 'super',
       });
   });
