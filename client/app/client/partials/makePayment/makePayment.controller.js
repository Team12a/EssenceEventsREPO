angular.module('essenceEventsRepoApp.client')
  .controller('makePaymentCtrl', ['$scope', '$state', 'Payments', function ($scope, $state, Payments) {



    $scope.find = function() {
      Payments.getAll()
	.then(function(response) {
	  $scope.Payments = response.data;
	}, function(error) {
	  $scope.error = 'Aint nothin';
      });
    };
}]);
