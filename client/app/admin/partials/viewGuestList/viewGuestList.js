
  'use strict';

  angular.module('essenceEventsRepoApp.admin')
    .config(function ($stateProvider) {
      $stateProvider
        .state('client.viewGuestListCtrl', {
          url: '/viewGuestList/',
          params: {
            eve: 'undefined',
            userID: 'undefined',
            usersName: 'undefined'
          },
          templateUrl: 'app/admin/partials/viewGuestList/viewGuestList.html',
          controller: 'viewGuestListCtrl',
          authenticate: 'admin'
        });
    });
