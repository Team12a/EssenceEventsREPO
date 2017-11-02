angular.module('essenceEventsRepoApp').factory('Payments', ['$http', '$location', '$cookies',
  function($http, $location, $cookies) {
    var methods = {
      getAll: function() {
        return $http.get('http://' + $location.host() + ':' + $location.port() + '/api/payments' + '?access_token=' + $cookies.get('token'));
      },

      getByUser: function(userId) {
	return $http.get('http://' + $location.host() + ':' + $location.port() + '/api/payments/user/' + userId + '?access_token=' + $cookies.get('token'));
      },

      getOne: function(id) {
	return $http.get('http://' + $location.host() + ':' + $location.port() + '/api/payments/' + id + '?access_token=' + $cookies.get('token'));
      },

      create: function(payment) {
	return $http.post('http://' + $location.host() + ':' + $location.port() + '/api/payments' + '?access_token=' + $cookies.get('token'), payment);
      },

      update: function(payment) {
	return $http.put('http://' + $location.host() + ':' + $location.port() + '/api/payments' + '?access_token=' + $cookies.get('token'), payment);
      },

      remove: function(id) {
	return $http.delete('http://' + $location.host() + ':' + $location.port() + '/api/payments/' + id + '?access_token=' + $cookies.get('token'));
      },

      removeUser: function(userId) {
	return $http.delete('http://' + $location.host() + ':' + $location.port() + '/api/payments/user/' + userId + '?access_token=' + $cookies.get('token'));
      }
    };
    return methods;
  }
]);
