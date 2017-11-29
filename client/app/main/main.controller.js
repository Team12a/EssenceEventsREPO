'use strict';

(function() {

class MainController {
  constructor(Auth, $state, $scope, $http, Events) {
    this.$http = $http;
    this.awesomeThings = [];
    this.isLoggedIn = Auth.isLoggedIn;
    this.isSuperAdmin = Auth.isSuperAdmin;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    //this.curUsr = this.getCurrentUser();
    //this.$state.go('customer', {userID: this.curUsr._id, userName: this.curUsr.name})
    this.state = $state;

    this.Evs = Events;
  }

  navigate(){
    var curUsr = this.getCurrentUser();
    let state = this.state;
    this.Evs.getByUser(curUsr._id)
    .then(function(response) {
      var events = response.data;
      state.go('customer', {userID: curUsr._id, userName: curUsr.name, events: events});
    }, function(err) {
      //do something
      console.log(err);
    });
   
  }

  // uploadFile(){
  
    

  //   file = document.getElementById("file").files[0],
  //   cloudinary.v2.uploader.upload(file, 
  //       { type: "authenticated" },
  //       {public_id: "test"},
  //       {invalidate: true}, 
  //       function(error, result) {console.log(result); });


  // };
      

}
})
angular.module('essenceEventsRepoApp')
  .controller('MainController',['Cloudinary', '$scope', '$stateParams', '$state', '$timeout', function (Cloudinary, $scope, $stateParams, $state, $timeout) {
    
    var actualUploadFile = function(file) {
      var payload = Cloudinary.signFileUploadRequest();
      payload.then(function(data) {
        
        var signature = data.data.signature;
        var timestamp = data.data.timestamp;
        var formData = new FormData(),
          xhr = new XMLHttpRequest(),
          cloudName = "dxqqlgb4t";
        console.log(file);
        formData.append("file", file);
        formData.append("upload_preset", "kinnmurr");
        formData.append("timestamp", timestamp);
        formData.append("signature", signature); // REQUIRED
        formData.append("invalidate",true);
        formData.append("public_id","new_new_test");
        for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
        }
        xhr.open("POST", "https://api.cloudinary.com/v1_1/" +
          cloudName +
          "/image/upload");
        xhr.onload = () => {
          if (xhr.status === 200) {
          
            // Success! You probably want to save the URL somewhere
            var response = JSON.parse(xhr.response);
            var temp = response.secure_url;
            console.log(response);
            // https address of uploaded file
          } else {
            alert("Upload failed. Please try agian.");
          }
        }
        xhr.send(formData);

      });
      
    };
    $scope.uploadFile = function(file) {
      var file = document.getElementById(file).files[0];
      $timeout( function(){
        console.log(file);
      },10000, true );
      //actualUploadFile(file);
    }
}]);

