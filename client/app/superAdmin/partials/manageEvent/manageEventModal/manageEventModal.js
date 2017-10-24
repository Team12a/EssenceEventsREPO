 'use strict';

  angular.module('essenceEventsRepoApp.superAdmin')
    .config(function ($stateProvider) {
      $stateProvider
        .state('superAdmin.manageEventModal', {
          url: '/manageEventModal',
          templateUrl: 'app/superAdmin/partials/manageClients/manageClientsModal/manageEventModal.html',
          controller: 'ManageEventModalCtrl',
          controllerAs: 'mancli',
          authenticate: 'superAdmin',
        });
    });
