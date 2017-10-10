'use strict';

angular.module('essenceEventsRepoApp.client')
  .controller('makePaymentCtrl', ['$scope', '$state', 'Payments', 'Auth', function ($scope, $state, Payments, Auth) {

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

    $scope.getPayments = function(){
      if (!$scope.id)
        setTimeout($scope.getPayments, 100);
      else
        Payments.paymentsByUserId($scope.id)
          .then(function(response) {
            $scope.payments = response.data;
          }, function(error) {
            //do something
        });
    };


    $scope.find = function() {
      Payments.getAll()
	.then(function(response) {
	  $scope.Payments = response.data;
	}, function(error) {
	  $scope.error = 'Aint nothin';
      });
    };
}]);
