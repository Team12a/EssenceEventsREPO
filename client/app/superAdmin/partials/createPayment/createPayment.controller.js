'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
.controller('CreatePaymentCtrl', ['Payments', '$scope', '$stateParams', '$state', function (Payments, $scope, $stateParams, $state) {

  // $scope.message = 'Hello';

  //handle people trying to hit url directly.
  if($stateParams.userID == 'undefined')
  {
    $state.go('super.manageAccounts');
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
      description: $scope.paymentDesc,
      dueDate: $scope.paymentDueDate,
      amount: $scope.amount,
      userId: $stateParams.userID
    };

    Payments.create(payment)
      .then(function(response) {
        $state.go('super.manageAccounts');
      }, function(err) {
        //do something
    });
  };

}]);
