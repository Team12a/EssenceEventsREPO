'use strict';

angular.module('essenceEventsRepoApp.admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('superAdmin.createContractor', {
        url: '/createContractor',
        templateUrl: 'app/superAdmin/partials/createContractor/createContractor.html',
        controller: 'CreateContractorCtrl',
        authenticate: 'super'
      });
  });
