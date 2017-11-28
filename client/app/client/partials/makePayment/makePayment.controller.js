'use strict';

angular.module('essenceEventsRepoApp')
.controller('makePaymentCtrl', ['Payments','Auth','$scope', '$stateParams', '$state', function ( Payments, Auth, $scope, $stateParams, $state) {

  var getUser = function() {
    if (!$scope.curUser._id)
      setTimeout(getUser, 100);
    else {
      $scope.clientName = $scope.curUser.name;
      $scope.id = $scope.curUser._id;
      console.log($scope.id);
    }
  };

  $scope.curUser = Auth.getCurrentUser();
  getUser();
  var getPayments = function(){
    console.log("Here");
    if (!$scope.id)
      setTimeout($scope.getPayments, 100);
    else
      Payments.getByUser($scope.id)
        .then(function(response) {
          $scope.payments = response.data;
        }, function(error) {
          //do something
      });
  };

    var getUser = function() {
      if (!$scope.curUser._id)
        setTimeout(getUser, 100);
      else {
        $scope.clientName = $scope.curUser.name;
        $scope.id = $scope.curUser._id;
      }
    };

    $scope.curUser = Auth.getCurrentUser();
    getUser();




    $scope.find = function() {
      Payments.findAll()
	.then(function(response) {
	  $scope.Payments = response.data;
	}, function(error) {
	  $scope.error = 'Aint nothin';
      });
    };
}]);
