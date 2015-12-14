'use strict';

/**
 * @ngdoc overview
 * @name toDoListApp
 * @description
 * # toDoListApp
 *
 * Main module of the application.
 */
angular
  .module('toDoListApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'firebase',
    'toaster',
    'ngMaterial',
    'facebook',
    'geolocation'
  ])
  // .constant('FURL', 'DEBUG')
  .constant('FURL', 'https://doittogether.firebaseio.com/')
  .config(function(FacebookProvider) {
     FacebookProvider.init('846350432152182');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html'

      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
