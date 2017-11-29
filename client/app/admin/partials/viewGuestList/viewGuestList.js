
  'use strict';

  angular.module('essenceEventsRepoApp.admin')
    .config(function ($stateProvider) {
      $stateProvider
        .state('admin.viewGuestList', {
          url: '/viewGuestList',
          params: {
            ev: 'undefined'
          },
          templateUrl: 'app/admin/partials/viewGuestList/viewGuestList.html',
          controller: 'viewGuestListCtrl',
          authenticate: 'admin'
        });
    });
