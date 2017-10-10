
angular.module('essenceEventsRepoApp.client')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.welcome', {
        url: '/welcome',
        templateUrl: 'app/client/partials/welcome/welcome.html',
        controller: 'WelcomeCtrl',
        controllerAs: 'welcome',
        authenticate: 'user'
      });
  });
