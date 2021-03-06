 'use strict';

  angular.module('essenceEventsRepoApp.admin')
    .config(function ($stateProvider) {
      $stateProvider
        .state('admin.manageEventModal', {
          url: '/manageEventModal',
          templateUrl: 'app/admin/partials/manageClients/manageClientsModal/manageEventModal.html',
          controller: 'ManageEventModalCtrl',
          controllerAs: 'mancli',
          authenticate: 'admin',
        });
    });
