//borrowed from https://gist.github.com/asafge/7430497
angular.module('essenceEventsRepoApp.client')
  .directive('ngReallyClick', [function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    }
}]);
