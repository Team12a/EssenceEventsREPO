'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('superAdmin.manageContractors', {
        url: '/manageContractors',
        templateUrl: 'app/superAdmin/partials/manageContractors/manageContractors.html',
        controller: 'ManageContractorsCtrl',
        authenticate: 'super'
      });
  });
