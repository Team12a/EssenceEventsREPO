'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('UploadTestimonialCtrl', ['Testimonial', '$scope', '$stateParams', '$state', function (Testimonial, $scope, $stateParams, $state) {


  $scope.submit = function() {
    var testimonial = {
      clientName: $scope.clientName,
      eventDescription: $scope.eventDescription,
      message: $scope.message
    };
  Testimonial.create(testimonial)
    .then(function(response) {
      $state.reload();
    }, function (err) {
      //do something
    });
  };

}]);
