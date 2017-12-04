'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
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

  $scope.delete = function(testimonial){
    Testimonials.remove(testimonial._id).then(function(){
        $state.reload();
      }
    );
  }


}]);
