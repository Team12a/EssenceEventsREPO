'use strict';

//directive for super admin nav bar 
angular.module('essenceEventsRepoApp.superAdmin')
  .directive('superadminnav', ()=> ({
    templateUrl: 'app/superAdmin/partials/superAdminNav/superAdminNav.html',
    restrict: 'E',
    controller: 'SuperAdminController',
    controllerAs: 'superAdmin'
  }));
