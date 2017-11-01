
angular.module('essenceEventsRepoApp.client')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.makePayment', {
        url: '/makePayment',
        templateUrl: 'app/client/partials/makePayment/makePayment.html',
        controller: 'makePaymentCtrl',
        controllerAs: 'makePayment',
        authenticate: 'user'
      });
  });
