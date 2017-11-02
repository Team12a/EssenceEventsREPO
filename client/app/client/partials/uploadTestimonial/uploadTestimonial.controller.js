'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('UploadTestimonialCtrl', ['Testimonials', '$scope', '$stateParams', '$state', function (Testimonials, $scope, $stateParams, $state) {


  $scope.submit = function() {
    var testimonial = {
      postName: $scope.postName,
      eventDescription: $scope.eventDescription,
      message: $scope.message
    };
  Testimonials.create(testimonial)
    .then(function(response) {
      $state.reload();
    }, function (err) {
      //do something
    });
  };

}]);
