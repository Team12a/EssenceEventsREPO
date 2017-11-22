'use strict';

angular.module('essenceEventsRepoApp')
.controller('makePaymentCtrl', ['Payments','Auth','$scope', '$stateParams', '$state', function ( Payments, Auth, $scope, $stateParams, $state) {

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
      Payments.getByUser($scope.id)
        .then(function(response) {
          $scope.payments = response.data;
        }, function(error) {
          //do something
      });
  };

    $scope.toPaypal(payment){
      console.log(payment.amount);
      paypal.Button.render({

        env: 'sandbox', // sandbox | production

        style: {
          label: 'paypal',
          size:  'small',    // small | medium | large | responsive
          shape: 'rect',     // pill | rect
          color: 'blue',     // gold | blue | silver | black
          tagline: false
        },

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
          sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
          production: '<insert production client id>'
        },

        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,

        // payment() is called when the button is clicked
        payment: function(data, actions) {

          // Make a call to the REST api to create the payment
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: "0.01", currency: 'USD' }
                }
              ]
            }
          });
        },

        // onAuthorize() is called when the buyer approves the payment
        onAuthorize: function(data, actions) {

          // Make a call to the REST api to execute the payment
          return actions.payment.execute().then(function() {
            window.alert('Payment Complete!');
          });
        }

      }, );

    };

}]);
