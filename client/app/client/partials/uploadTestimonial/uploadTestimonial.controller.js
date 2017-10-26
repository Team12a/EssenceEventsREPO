'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('UploadTestimonialCtrl', ['Testimonial', '$scope', '$stateParams', '$state', function (Testimonial, $scope, $stateParams, $state) {


  $scope.submit = function() {
    var testimonial = {
      name: $scope.clientName,
      ename: $scope.eventDescription,
      message: $scope.message
    };
  Testimonial.create(testimonial)
      .then(function(response) {
        $state.go('client.uploadTestimonial');
      }, function(err) {
        //do something
    });
  };

}]);
