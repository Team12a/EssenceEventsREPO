
angular.module('essenceEventsRepoApp.client')
.config(function ($stateProvider) {
  $stateProvider
    .state('client.manageEvent', {
      url: '/manageEvent',
      templateUrl: 'app/client/partials/manageEvent/manageEvent.html',
      controller: 'manageEventCtrl',
      controllerAs: 'manageEvent',
      authenticate: 'user'
    });
});
