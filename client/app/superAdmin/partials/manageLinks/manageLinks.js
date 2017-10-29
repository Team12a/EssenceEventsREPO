'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('superAdmin.manageLinks', {
        url: '/manageLinks',
        templateUrl: 'app/superAdmin/partials/manageLinks/manageLinks.html',
        controller: 'ManageLinksCtrl',
        authenticate: 'super'
      });
  });
