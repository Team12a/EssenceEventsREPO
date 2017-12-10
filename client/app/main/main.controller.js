// 'use strict';
//   class CelebrationsCtrl {
//   navigate(){
//     var curUsr = this.getCurrentUser();
//     let state = this.state;
//     this.Evs.getByUser(curUsr._id)
//     .then(function(response) {
//       var events = response.data;
//       state.go('client.welcome', {userID: curUsr._id, userName: curUsr.name, events: events});
//     }, function(err) {
//       //do something
//       console.log(err);
//     });
//
//   }
// 
// //Added this.isSuperAdmin to constructor, line 85
//   constructor(Auth, $state, $scope, Events) {
//     this.isLoggedIn = Auth.isLoggedIn;
//     this.isSuperAdmin = Auth.isSuperAdmin;
//     this.isAdmin = Auth.isAdmin;
//     this.getCurrentUser = Auth.getCurrentUser;
//     //this.curUsr = this.getCurrentUser();
//     //this.$state.go('customer', {userID: this.curUsr._id, userName: this.curUsr.name})
//     this.state = $state;
//
//     this.Evs = Events;
//
//     //this.navigate();
//   }
// }
angular.module('essenceEventsRepoApp')
.controller('MainController',['Cloudinary', '$scope', '$stateParams', '$state', '$timeout','Auth', function (Cloudinary, $scope, $stateParams, $state, $timeout, Auth) {

  // var actualUploadFile = function(file) {
  //   var payload = Cloudinary.signFileUploadRequest();//Generates signature and timestamp server side
  //   payload.then(function(data) {
  //     var signature = data.data.signature;
  //     var timestamp = data.data.timestamp;
  //     var formData = new FormData(),
  //       xhr = new XMLHttpRequest(),
  //       cloudName = "dxqqlgb4t";
  //     console.log(file);
  //     formData.append("file", file.name);
  //     formData.append("api_key", "328814721185186");
  //     formData.append("timestamp", timestamp);
  //     formData.append("signature", signature);
  //     formData.append("callback", "http://" + window.location.host + "/cloudinary_cors.html");

  //     formData.append("invalidate",true);
  //     formData.append("public_id","new_new_test");
  //     for (var pair of formData.entries()) {
  //       console.log(pair[0]+ ', ' + pair[1]);
  //     }
  //     xhr.open("POST", "https://api.cloudinary.com/v1_1/" +
  //       cloudName +
  //       "/image/upload");
  //     xhr.onload = () => {
  //       if (xhr.status === 200) {

  //         // Success! You probably want to save the URL somewhere
  //         console.warn(xhr.response)
  //         //console.log(xhr.response);
  //         var response = JSON.parse(xhr.response);
  //         var temp = response.secure_url;
  //         console.log(response);
  //         // https address of uploaded file
  //       } else {
  //         alert("Upload failed. Please try agian.");
  //       }
  //     }
  //     xhr.send(formData);

  //   });

  // // };

  // $scope.uploadImage = function(files) {
  //   var fileToSend = document.getElementById(files).files[0];
  //   console.log(fileToSend.name);
  //   // actualUploadFile(fileToSend);
  // }

}]);
