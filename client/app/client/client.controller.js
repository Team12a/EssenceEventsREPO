//made changes to mimic admin account need to make a client controller name
// change line 6 and 7

'use strict';

angular.module('essenceEventsRepoApp.client')
  .controller('ClientController', ['$scope', function($scope)
  {

    $scope.Functions = [
      {
        'title': 'Welcome',
        'description': 'Overview screen of pending events',
        'state': 'client.welcome',
      },
      {
        'title': 'Your Event',
        'description': 'Managage specific event',
        'state': 'client.manageEvent',
      },
      {
        'title': 'Your Budget',
        'description': 'Manage budget for specific event',
        'state': 'client.manageBudget',
      },
      {
        'title': 'Your Guest List',
        'description': 'Manage guest list for specific event',
        'state': 'client.manageGuestList',
      },
      {
        'title': 'Make a Payment',
        'description': 'Access payments and pay through paypal',
        'state': 'client.makeAPayment',
      },
      {
        'title': 'Upload a Testimonial',
        'description': 'Add testimonial regarding event',
        'state': 'client.uploadTestimonial',
      },
    ];


  }]);
