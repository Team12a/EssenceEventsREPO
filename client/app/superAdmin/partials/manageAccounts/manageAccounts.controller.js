'use strict';
(function(){

  class ManageAccountsCtrl{

      //pass dependencies through constructor
      constructor(User, $modal, $scope, $state, $cookies) {
        // Use the User $resource to fetch all users
        this.alldata = User.query({access_token: $cookies.get('token')});
	      this.modalService = $modal;
      }

      //Open Manage Clients Modal to manage client information and create events for a client
      openModal(user){
        var modalInstance = this.modalService.open({
          animation: true,
          templateUrl: 'app/superAdmin/partials/manageAccounts/manageAccountsModal/manageAccountsModal.html',
          controller: 'ManageAccountsModalCtrl',
          resolve: {
            user: function()
            {
              return user;
            }
          }
        });
      }

      //Delete user from database
      delete(user) {
        user.$remove();
        this.alldata.splice(this.alldata.indexOf(user), 1);
      }
  }
  angular.module('essenceEventsRepoApp.superAdmin')
    .controller('ManageAccountsCtrl', ManageAccountsCtrl);

})();