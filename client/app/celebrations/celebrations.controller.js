
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
      console.log('h');
      // if (textToEdit.contentEditable == "true") {
      //   TextEdit.create(textToSubmit)
      //   .then(function(response) {
      //     $state.reload();
      //   }, function (err) {
      //     //do something
      //   });
      if (textToEdit.contentEditable == "true") {
        TextEdit.update(textToSubmit)
        .then(function(response) {
          $state.reload();
        }, function (err) {
          //do something
        });
        textToEdit.contentEditable = "false";
      } else{
        textToEdit.contentEditable = "true";
      }

    };

    $scope.getText = function(){
      var text_id='celebrationDescriptText';
      // console.log('Here');
      TextEdit.getByID(text_id)
        .then(function(response) {
          $scope.literalText = response.data[0].literalText;
          console.log(response.data);
        }, function(error) {
          console.log('hey');
          //do something
      });
    };


   $scope.update=function(){

   }


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
