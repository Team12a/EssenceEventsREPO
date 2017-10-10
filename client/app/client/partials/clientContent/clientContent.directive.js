'use strict';

angular.module('essenceEventsRepoApp')
  .directive('clientContent', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the clientContent directive');
      }
    };
  });
