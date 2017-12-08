'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
.controller('CreatePaymentCtrlSuper', ['Payments', '$scope', '$stateParams', '$state', function (Payments, $scope, $stateParams, $state) {

  // $scope.message = 'Hello';

  //handle people trying to hit url directly.
  if($stateParams.userID == 'undefined')
  {
    $state.go('superAdmin.manageAccounts');
  }

  //used to display the user you are talking to
  $scope.clientName = $stateParams.usersName;

  //datePickerOptions
  $scope.dateOptions =



  //set up date for event
  $scope.paymentDueDate = new Date();
  $scope.openPaymentDate = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.paymentDateOpened = true;
  };


  //Saves all of the $scope fields into an event object and saves it to the database
  $scope.submit = function() {
    var payment = {
      description: "Initial Meeting Fee",
      dueDate: $scope.paymentDueDate,
      amount: 25.00,
      userId: $stateParams.userID
    };

    Payments.create(payment)
      .then(function(response) {
        $state.go('superAdmin.managePayment');
      }, function(err) {
        //do something
    });
  };

}]);
