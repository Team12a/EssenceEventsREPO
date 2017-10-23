'use strict';

angular.module('essenceEventsRepoApp')
.controller('UploadTestimonialCtrl', ['$scope', 'Auth', 'Email', '$state', function ($scope, Auth, Email, $state) {

  //Setup email response messages
  $scope.emailSuccess = false;
  $scope.emailError = false;


  //Setup email fields based on form and send it to backend where nodemailer sends message
  $scope.submit = function() {
    var testimonial = {
      name : $scope.name,
      eventDescription : $scope.ename,
      message: $scope.message
    };

    Email.contactUs(email)
    .then(function(response) {
      $state.reload();
      $scope.emailSuccess = true;
    }, function(error) {
      $scope.emailError = true;
    });
  }
}]);
