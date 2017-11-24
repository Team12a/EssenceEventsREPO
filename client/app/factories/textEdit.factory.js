angular.module('essenceEventsRepoApp').factory('TextEdit', ['$http', '$location', '$cookies',
function($http, $location, $cookies) {
  var methods = {
    create: function(textEdit) {
  return $http.post('http://' + $location.host() + ':' + $location.port() + '/api/textEdit' + '?access_token=' + $cookies.get('token'), textEdit);
    }
  };  
  return methods;
}
]);
