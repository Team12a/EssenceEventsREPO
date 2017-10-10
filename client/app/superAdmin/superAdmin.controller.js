'use strict';

//functions that will be included in our Super Admin Panel
angular.module('essenceEventsRepoApp.superAdmin')
  .controller('SuperAdminController',['$scope',function($scope)
{
    $scope.Functions = [
      {
        'title': 'Update Pictures',
        'description': 'Update pictures',
        'state' : 'superAdmin.updatePictures',
      },
      {
        'title': 'Update Testimonials',
        'description' : 'Manage and upload testimonials',
        'state' : 'superAdmin.updateTestimonials',
      },
      {
        'title': 'Update Vendors',
        'description' : 'Manage vendors included in vendors tab',
        'state' : 'superAdmin.updateVendors',
      }
      /*still need to add some functions here, specifically need to implement way to access admin priviledges
      to avoid redundancy by copy pasting
      */
    ];

}]);
