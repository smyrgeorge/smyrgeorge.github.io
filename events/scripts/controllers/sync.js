'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:SyncCtrl
 * @description
 * # SyncCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
    .controller('SyncCtrl', function($scope, $location, FacebookAuthenticationService, FacebookUserEventsService, FirebaseUserEventsService) {

      $scope.fbauth = FacebookAuthenticationService;
      $scope.frevents = FirebaseUserEventsService;
      $scope.fbevents = FacebookUserEventsService;

      if($scope.fbauth.user === null){
        $location.path('/login');
      }

      $scope.profileImage = $scope.fbauth.profileImage;

      //sync with facebook events with firebase procedure:
      $scope.frevents.createEventsChildRef($scope.fbauth.user.id);
      $scope.fbevents.getUserEvents();
    });
