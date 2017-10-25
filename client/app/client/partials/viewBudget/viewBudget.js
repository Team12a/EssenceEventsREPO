
angular.module('essenceEventsRepoApp.client')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.viewBudget', {
        url: '/viewBudget',
        templateUrl: 'app/client/partials/viewBudget/viewBudget.html',
        controller: 'viewBudgetCtrl',
        controllerAs: 'viewBudget',
        authenticate: 'user'
      });
  });
