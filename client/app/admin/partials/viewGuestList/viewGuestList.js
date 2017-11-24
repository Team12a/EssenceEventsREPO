'use strict';

angular.module('essenceEventsRepoApp.admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.viewGuestList', {
        url: '/viewGuestList/',
        params: {
          userID: 'undefined',
          usersName: 'undefined'
        },
        templateUrl: 'app/admin/partials/viewGuestList/viewGuestList.html',
        controller: 'ViewGuestListCtrl',
        authenticate: 'admin'
      });
  });
