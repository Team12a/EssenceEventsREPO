angular.module('essenceEventsRepoApp').factory('TextEdit', ['$http', '$location', '$cookies',
function($http, $location, $cookies) {
  var methods = {
    create: function(textEdit) {
      return $http.post('http://' + $location.host() + ':' + $location.port() + '/api/textEdit' + '?access_token=' + $cookies.get('token'), textEdit);
    },
    update: function(textEdit){
      return $http.put('http://' + $location.host() + ':' + $location.port() + '/api/textEdit' + '?access_token=' + $cookies.get('token'), textEdit);
    },
    getByID: function(text_id) {
      return $http.get('http://' + $location.host() + ':' + $location.port() + '/api/textEdit/' + text_id + '?access_token=' + $cookies.get('token'));
    }
  };
  return methods;
}
]);
