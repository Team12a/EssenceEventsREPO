
  'use strict';
  
  angular.module('essenceEventsRepoApp.client')
  .controller('CelebrationsCtrl', ['TextEdit', '$scope', '$stateParams', '$state', function (TextEdit, $scope, $stateParams, $state) {
    $scope.submit = function(id) {
     
      var textToEdit = document.getElementById(id);
      console.log(textToEdit);
      var lt = textToEdit.innerHTML;

      var textToSubmit = {
        text_id: id,
        literalText: lt
      };

      if (textToEdit.contentEditable == "true") {
        TextEdit.create(textToSubmit)
        .then(function(response) {
          $state.reload();
        }, function (err) {
          //do something
        });
        textToEdit.contentEditable = "false";
      }else{
        textToEdit.contentEditable = "true";
      }

    };

    $scope.getText = function(id){
      var text_id = id;
      console.log(id);
      console.log("Here");
      if (!$scope.text_id)
        setTimeout($scope.getText, 100);
      else
        TextEdit.textByID($scope.text_id)
          .then(function(response) {
            $scope.literalText = response.data;
          }, function(error) {
            //do something
        });
    };

  
    
  
    // $scope.myFunction = function(button,id) {
    // var x = document.getElementById(id);
    // if (x.contentEditable == "true") {
    //     x.contentEditable = "false";
    //     button.innerHTML = "Enable content of p to be editable!";
    // } else {
    //     x.contentEditable = "true";
    //     button.innerHTML = "Disable content of p to be editable!";
    // }

  }]);
  