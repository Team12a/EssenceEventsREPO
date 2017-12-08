'use strict';
'use strict';

    class ReservationsCtrl {
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

angular.module('essenceEventsRepoApp')
.controller('ReservationsCtrl', ['$scope', 'Auth', 'Email', '$state', 'TextEdit', function ($scope, Auth, Email, $state, TextEdit) {
  //Disallowing touch screens to drag helps phones scroll down the page easier
  var isDraggable = !('ontouchstart' in document.documentElement);

  //Setup email response messages
  $scope.emailSuccess = false;
  $scope.emailError = false;

  //Setup map properties
  $scope.map = { center: { latitude: 29.65253, longitude: -82.330276 }, zoom: 17, options: {draggable: isDraggable}};
  $scope.coordsUpdates = 0;
  $scope.dynamicMoveCtr = 0;
  $scope.marker = {
    id:0,
    coords: {
      latitude: 29.65253,
      longitude: -82.330276
    },
    options: {draggable: false}
  };

  //Setup email fields based on form and send it to backend where nodemailer sends message
  $scope.submit = function() {
    var email = {
      firstName: $scope.fname,
      lastName: $scope.lname,
      address: $scope.email,
      phone: $scope.phone,
      eventDate: $scope.edate,
      message: $scope.message
    };

    Email.contactUs(email)
    .then(function(response) {
      $state.reload();
      $scope.emailSuccess = true;
    }, function(error) {
      $scope.emailError = true;
    });
  }


  $scope.submit_text = function(id) {

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
    var text_id= 'address_text';
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
    var text_id= 'phone_text';
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
