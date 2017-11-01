angular.module('essenceEventsRepoApp').factory('Testimonial', ['$http', '$location', '$cookies',
  function($http, $location, $cookies) {
    var methods = {
      create: function(testimonial) {
	return $http.post('http://' + $location.host() + ':' + $location.port() + '/api/testimonial' + '?access_token=' + $cookies.get('token'), testimonial);
      }
    };  
    return methods;
  }
]);
