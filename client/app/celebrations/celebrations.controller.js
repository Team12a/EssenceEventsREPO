
  'use strict';
  
  angular.module('essenceEventsRepoApp.client')
  .controller('CelebrationsCtrl', ['TextEdit', '$scope', '$stateParams', '$state', function (TextEdit, $scope, $stateParams, $state) {
  
    $scope.submit = function() {
      var text = {
        text_id: $scope.text_id,
        literalText: $scope.literalText
      };
      TextEdit.create(text)
      .then(function(response) {
        $state.reload();
      }, function (err) {
        //do something
      });
    };
  
  }]);
  
