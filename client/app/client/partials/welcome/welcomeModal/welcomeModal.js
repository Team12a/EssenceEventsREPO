'use strict';

 angular.module('essenceEventsRepoApp.client')
   .config(function ($stateProvider) {
     $stateProvider
       .state('welcomeModal', {
         url: '/welcomeModal',
         templateUrl: 'app/client/partials/welcome/welcomeModal/welcomeModal.html',
         controller: 'WelcomeModalCtrl',
         controllerAs: 'welmod',
         authenticate: 'user',
       });
   });
