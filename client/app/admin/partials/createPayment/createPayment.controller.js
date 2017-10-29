'use strict';

angular.module('essenceEventsRepoApp.admin')
.controller('CreatePaymentCtrl', ['Payments', '$scope', '$stateParams', '$state', function (Payments, $scope, $stateParams, $state) {

  // $scope.message = 'Hello';

  //handle people trying to hit url directly.
  if($stateParams.userID == 'undefined')
  {
    $state.go('admin.manageClients');
  }

  //used to display the user you are talking to
  $scope.clientName = $stateParams.usersName;

  //datePickerOptions
  $scope.dateOptions =



  //set up date for event
  $scope.eventDate = new Date();
  $scope.openEventDate = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.eventDateOpened = true;
  };


  //Saves all of the $scope fields into an event object and saves it to the database
  $scope.submit = function() {
    var payment = {
      description: $scope.paymentDesc,
      dueDate: $scope.paymentDueDate,
      amount: $scope.amount,
      userId: $stateParams.userID
    };

    Payments.create(payment)
      .then(function(response) {
        $state.go('admin.managePayment');
      }, function(err) {
        //do something
    });
  };

}]);
