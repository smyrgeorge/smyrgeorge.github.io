'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:LogInCtrl
 * @description
 * # LogInCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
    .controller('LogInCtrl', function($scope, $location, FacebookAuthenticationService) {

      $scope.fbauth = FacebookAuthenticationService;
      $scope.profileImage = $scope.fbauth.profileImage;

      // if($scope.fbauth.loggedIn){
      //   $scope.fbauth.redirectIfLoggedIn();
      // }

      $scope.facebookLogin = function() {
        $scope.fbauth.facebookLogin();
      };


    });
