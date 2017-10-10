'use strict'

//state initialization for updating Pictures section

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function($stateProvider){
    $stateProvider
      .state('superAdmin.updatePictures',{
        url:'/updatePictures',
        templateUrl:'app/superAdmin/partials/updatePictures/updatePictures.html',
        //controller: 'updatePicturesCtrl',
        authenticate:'superAdmin'
      });
  });
