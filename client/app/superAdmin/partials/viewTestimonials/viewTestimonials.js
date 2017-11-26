'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('superAdmin.viewTestimonials', {
        url: '/viewTestimonials/',
        params: {
          userID: 'undefined',
          usersName: 'undefined'
        },
        templateUrl: 'app/superAdmin/partials/viewTestimonials/viewTestimonials.html',
        controller: 'ViewTestimonialsCtrl',
        authenticate: 'super'
      });
  });
