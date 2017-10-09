'use strict'

//state initialization for updating Testimonials section

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function($stateProvider){
    $stateProvider
      .state('superAdmin.updateTestimonials',{
        url: '/updateTestimonials',
        templateUrl:'/app/superAdmin/partials/updateTestimonials/updateTestimonials.html',
        //controller: 'updateTestimonialsCtrl',
        authenticate:'superAdmin'
      });
  });
