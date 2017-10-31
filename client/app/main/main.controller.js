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

  uploadFile(){
  
    var cloudinary = require('cloudinary');
    file = document.getElementById("file").files[0];
    
    cloudinary.uploader.upload(file, function(result) { console.log(result) }, {public_id: 'sample_remote'});

  };
  

}

angular.module('essenceEventsRepoApp')
  .controller('MainController', MainController);

})();
