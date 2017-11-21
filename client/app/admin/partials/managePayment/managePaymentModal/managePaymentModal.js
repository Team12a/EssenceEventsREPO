'use strict';

 angular.module('essenceEventsRepoApp.admin')
   .config(function ($stateProvider) {
     $stateProvider
       .state('managePaymentModal', {
         url: '/managePaymentModal',
         templateUrl: 'app/admin/partials/manageClients/manageClientsModal/managePaymentModal.html',
         controller: 'managePaymentModalCtrl',
         controllerAs: 'mancli',
         authenticate: 'admin',
       });
   });
