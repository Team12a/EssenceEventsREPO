 'use strict';

  angular.module('essenceEventsRepoApp.superAdmin')
    .config(function ($stateProvider) {
      $stateProvider
        .state('superAdmin.manageContractorModal', {
          url: '/manageContractorModal',
          templateUrl: 'app/superAdmin/partials/manageContractors/manageContractorModal/manageContractorModal.html',
          controller: 'ManageContractorModalCtrl',
          controllerAs: 'mancon',
         authenticate: 'superAdmin'
        });
    });
