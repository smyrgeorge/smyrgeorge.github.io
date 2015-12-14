'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('ListCtrl', function ($scope, $location, FacebookUserEventsService, FacebookAuthenticationService, FirebaseUserEventsService) {

    $scope.fbauth = FacebookAuthenticationService;
    $scope.fbevents = FacebookUserEventsService;
    $scope.frevents = FirebaseUserEventsService;


    $scope.frevents.createEventsChildRef($scope.fbauth.user.id);

    //attach events from firebase to view
    $scope.attending = $scope.frevents.getAttending();
    $scope.maybeAttending = $scope.frevents.getMaybeAttending();
    $scope.notReplied =$scope.frevents.getNotReplied();
    $scope.declined =$scope.frevents.getDeclined();

    //sync with firebase procedure:
    $scope.fbevents.getAttending();
    $scope.fbevents.getMaybeAttending();
    $scope.fbevents.getNotReplied();
    $scope.fbevents.getDeclined();




    // if(!$scope.fbauth.loggedIn){
    //   $location.path('/login');
    // }

  });
