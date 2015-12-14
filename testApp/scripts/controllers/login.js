'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:LogInCtrl
 * @description
 * # LogInCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
    .controller('LogInCtrl', function($scope, $location, FacebookAuthenticationService, FacebookUserEventsService) {

      $scope.fbauth = FacebookAuthenticationService;
      $scope.fbevents = FacebookUserEventsService;

      if($scope.fbauth.loggedIn){
        $scope.fbauth.redirectIfLoggedIn();
      }

      $scope.facebookLogin = function() {
        $scope.fbauth.facebookLogin();
      };


    });
