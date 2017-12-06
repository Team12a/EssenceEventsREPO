'use strict';

  class WeddingsCtrl {
  navigate(){
    var curUsr = this.getCurrentUser();
    let state = this.state;
    this.Evs.getByUser(curUsr._id)
    .then(function(response) {
      var events = response.data;
      state.go('client.welcome', {userID: curUsr._id, userName: curUsr.name, events: events});
    }, function(err) {
      //do something
      console.log(err);
    });

  }

//Added this.isSuperAdmin to constructor, line 85
  constructor(Auth, $state, $scope, Events) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isSuperAdmin = Auth.isSuperAdmin;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    //this.curUsr = this.getCurrentUser();
    //this.$state.go('customer', {userID: this.curUsr._id, userName: this.curUsr.name})
    this.state = $state;

    this.Evs = Events;

    //this.navigate();
  }
}

angular.module('essenceEventsRepoApp.client')
.controller('WeddingsCtrl', ['TextEdit', '$scope', '$stateParams', '$state', function (TextEdit, $scope, $stateParams, $state) {
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

  $scope.getText1 = function(){
    var text_id= 'weddingDescriptText';
    // console.log('Here');
    TextEdit.getByID(text_id)
      .then(function(response) {
        $scope.literalText1 = response.data[0].literalText;
        console.log(response.data);
      }, function(error) {
        console.log('hey');
        //do something
    });
  };
  $scope.getText2 = function(){
    var text_id= 'weddingTestimonial';
    var text_id2='weddingTestimonialAuthor';
    // console.log('Here');
    TextEdit.getByID(text_id)
      .then(function(response) {
        $scope.literalText2 = response.data[0].literalText;
        console.log(response.data);
      }, function(error) {
        console.log('hey');
        //do something
    });
  };
  $scope.getText3 = function(){
    var text_id='weddingTestimonialAuthor';
    // console.log('Here');
    TextEdit.getByID(text_id)
      .then(function(response) {
        $scope.literalText3 = response.data[0].literalText;
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
