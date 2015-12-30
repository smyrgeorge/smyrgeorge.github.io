'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:TodayCtrl
 * @description
 * # TodayCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('TodayCtrl', function ($scope, FirebaseEventsService, $firebaseArray) {

    var frevents = FirebaseEventsService;

    $scope.events = frevents.getTodayEvents();

  });
