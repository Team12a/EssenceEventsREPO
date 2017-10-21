'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('addGuestCtrl', [ 'Events', 'Auth',  '$scope','$stateParams', '$state', function ( Events, Auth, $scope, $stateParams, $state) {
