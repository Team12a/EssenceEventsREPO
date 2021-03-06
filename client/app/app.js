// added a client module
'use strict';

angular.module('essenceEventsRepoApp', [
  'essenceEventsRepoApp.auth',
  'essenceEventsRepoApp.superAdmin',
  'essenceEventsRepoApp.admin',
  'essenceEventsRepoApp.client',
  'essenceEventsRepoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'nvd3',
  'mwl.calendar',
  'uiGmapgoogle-maps'
])
  .config(['$urlRouterProvider', '$locationProvider', 'calendarConfig', '$httpProvider', 'uiGmapGoogleMapApiProvider',
  function($urlRouterProvider, $locationProvider, calendarConfig, $httpProvider, uiGmapGoogleMapApiProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    calendarConfig.displayAllMonthEvents = true;

    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDTiE3uowLwUmTscMZYqxVIEGCRiFIPNwo',
        v: '3', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
  }])
.filter('phone', function() {
  return function(number) {
    if (!number)
      return '----';
    else if (number.length == 7)
      return (number.substring(0,3) + '-' + number.substring(3,7));
    else if (number.length == 10)
      return ('(' + number.substring(0,3) + ') ' + number.substring(3,6) + '-' + number.substring(6,10));
    else
      return number;
  };
});
