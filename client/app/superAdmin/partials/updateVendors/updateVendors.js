'use strict'

//state initialization for updating Vendors section
angular.module('essenceEventsRepoApp.superAdmin')
  .config(function($stateProvider){
      $stateProvider
        .state('superAdmin.updateVendors',{
          url:'/updateVendors',
          templateUrl:'/app/superAdmin/partials/updateVendors/updateVendors.html',
          //controller:'updateVendorsCtrl',
          authenticate: 'superAdmin'
        });
  });
