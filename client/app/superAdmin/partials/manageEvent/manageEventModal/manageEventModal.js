 'use strict';

  angular.module('essenceEventsRepoApp.superAdmin')
    .config(function ($stateProvider) {
      $stateProvider
        .state('superAdmin.manageEventModal', {
          url: '/manageEventModal',
          templateUrl: 'app/superAdmin/partials/manageAccounts/manageAccountsModal/manageEventModal.html',
          controller: 'ManageEventModalCtrl',
          controllerAs: 'mancli',
          authenticate: 'super',
        });
    });
