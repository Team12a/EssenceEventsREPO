'use strict';

angular.module('essenceEventsRepoApp.client')
  .directive('clientnav', () => ({
      templateUrl: 'app/client/partials/clientNav/clientNav.html',
      restrict: 'E',
      controller: 'ClientController',
      controllerAs: 'client'
      }));
