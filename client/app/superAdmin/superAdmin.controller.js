'use strict';

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
      //still need to add some functions here
    ];

}]);
