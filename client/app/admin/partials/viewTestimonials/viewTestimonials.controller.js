'use strict';

angular.module('essenceEventsRepoApp.admin')
.controller('ViewTestimonialsCtrl', ['$scope', '$state', '$modal', 'Testimonials', function ($scope, $state, $modal, Testimonials) {
  //Get all links from Links Factory
  $scope.getTestimonials = function() {
    Testimonials.getAll()
    .then(function(response) {
      $scope.testimonials = response.data;
    }, function(err) {
      //do something
    });
  };

}]);
