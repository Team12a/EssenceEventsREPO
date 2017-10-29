angular.module('essenceEventsRepoApp.client')
  .controller('makePaymentCtrl', ['$scope', '$state', 'Payments', function ($scope, $state, Payments) {
    //Save form fields to contractor object and save it to the database

    //Get all subcontractors and save them to $scope.subcontractors
    $scope.find = function() {
      Payments.getAll()
	.then(function(response) {
	  $scope.Payments = response.data;
	}, function(error) {
	  $scope.error = 'Aint nothin';
      });
    };
}]);
