'use strict';


//directive for super admin content
angular.module('essenceEventsRepoApp')
  .directive('superAdminContent', function(){
    return{
      template: '<div></div>',
      restrict: 'EA',
      link: function(scope, element, attrs){
        element.text('this is the superAdminContent directive');
      }
    };
  });
