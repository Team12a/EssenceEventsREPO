'use strict';

angular.module('essenceEventsRepoApp.client')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client.uploadTestimonial', {
        url: '/uploadTestimonial',
        templateUrl: 'app/client/partials/uploadTestimonial/uploadTestimonial.html',
        controller: 'UploadTestimonialCtrl',
        authenticate: 'user',
        controllerAs: 'upload'
      });
  });
