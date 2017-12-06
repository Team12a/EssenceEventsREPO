
  'use strict';

  angular.module('essenceEventsRepoApp.superAdmin')
    .config(function ($stateProvider) {
      $stateProvider
        .state('superAdmin.viewGuestList', {
          url: '/viewGuestList',
          params: {
            ev: 'undefined'
          },
          templateUrl: 'app/superAdmin/partials/viewGuestList/viewGuestList.html',
          controller: 'viewGuestListCtrlSuper'
        });
    });
