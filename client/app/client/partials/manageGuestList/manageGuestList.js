
angular.module('essenceEventsRepoApp.client')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.manageGuestList', {
        url: '/manageGuestList',
        templateUrl: 'app/client/partials/manageGuestList/manageGuestList.html',
        controller: 'manageGuestListCtrl',
        controllerAs: 'manageGuestList',
        authenticate: 'user'
      });
  });
