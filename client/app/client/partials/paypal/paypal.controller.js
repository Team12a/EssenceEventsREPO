'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('paypalCtrl', [ 'Auth',  '$scope','$stateParams', '$state', function (Auth, $scope, $stateParams, $state) {

  $scope.payment =  $stateParams.payment;

}]);
