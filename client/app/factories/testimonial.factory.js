angular.module('essenceEventsRepoApp').factory('Testimonials', ['$http', '$location', '$cookies',
  function($http, $location, $cookies) {
    var methods = {
      create: function(testimonial) {
	return $http.post('http://' + $location.host() + ':' + $location.port() + '/api/testimonials' + '?access_token=' + $cookies.get('token'), testimonial);
      },
      getAll: function() {
	return $http.get('http://' + $location.host() + ':' + $location.port() + '/api/testimonials');
      }
    };
    return methods;
  }
]);
