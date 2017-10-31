'use strict';

angular.module('essenceEventsRepoApp.admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.viewTestimonials', {
        url: '/viewTestimonials/',
        params: {
          userID: 'undefined',
          usersName: 'undefined'
        },
        templateUrl: 'app/admin/partials/viewTestimonials/viewTestimonials.html',
        controller: 'ViewTestimonialsCtrl',
        authenticate: 'admin'
      });
  });
