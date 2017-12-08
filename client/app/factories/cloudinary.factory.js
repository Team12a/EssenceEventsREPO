angular.module('essenceEventsRepoApp').factory('Cloudinary', ['$http', '$location', '$cookies',
function($http, $location, $cookies) {
  var methods = {
    signFileUploadRequest: function() {
  return $http.get('http://' + $location.host() + ':' + $location.port() + '/api/cloudinary' + '?access_token=' + $cookies.get('token'), cloudinary);
    }
  };  
  return methods;
}
]);
