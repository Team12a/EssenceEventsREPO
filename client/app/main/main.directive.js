'use strict';

angular.module('essenceEventsRepoApp')
  .directive('main', () => ({
    templateUrl: 'client/app/main/main.html',
    restrict: 'E',
    controller: 'MainController',
    controllerAs: 'main'
  }));
