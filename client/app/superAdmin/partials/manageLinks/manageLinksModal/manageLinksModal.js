 'use strict';

  angular.module('essenceEventsRepoApp.superAdmin')
    .config(function ($stateProvider) {
      $stateProvider
        .state('superAdmin.manageLinksModal', {
          url: '/manageLinksModal',
          templateUrl: 'app/superAdmin/partials/manageLinks/manageLinksModal/manageLinksModal.html',
          controller: 'ManageLinksModalCtrlSuper',
          controllerAs: 'mancon',
         authenticate: 'super'
        });
    });
