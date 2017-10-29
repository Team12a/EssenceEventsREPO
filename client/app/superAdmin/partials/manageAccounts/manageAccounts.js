'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('superAdmin.manageAccounts', {
        url: '/manageAccounts',
        templateUrl: 'app/superAdmin/partials/manageAccounts/manageAccounts.html',
        controller: 'ManageAccountsCtrl',
        controllerAs: 'mc',
        authenticate: 'super'
      });
  });
