'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('EventCtrl', function ($scope, $routeParams, FirebaseUserEventsService) {

    var frevents = FirebaseUserEventsService;

    $scope.eventID = $routeParams.id;
    $scope.ev = frevents.getEvent($scope.eventID);

    $scope.map = {
      zoom: 16
    };

    console.log($scope.eventID);

  });
