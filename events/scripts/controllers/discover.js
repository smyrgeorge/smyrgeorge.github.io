'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:DiscoverCtrl
 * @description
 * # DiscoverCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('DiscoverCtrl', function ($scope, $log, FirebaseEventsService) {

    var frevents = FirebaseEventsService;


    var tabs = [];
    var selected = null;
    var previous = null;

    $scope.tabs = tabs;
    $scope.selectedIndex = 0;

    $scope.initialize = function() {
      frevents.getCurrentDate();
      $scope.currentDate = frevents.today;
      $scope.yesterday = frevents.getYesterday();
      console.log($scope.currentDate);

      // $scope.addTab($scope.yesterday.full, "", $scope.yesterday);
      $scope.addTab($scope.currentDate.full, "", $scope.currentDate);
    }



    $scope.$watch('selectedIndex', function(current, old) {
      previous = selected;
      selected = tabs[current];

      // if ( old + 1 && (old != current)) {
      //   $log.debug('Goodbye ' + previous.title + '!');
      // }

      if ( current + 1 ) {
        $log.debug('Hello ' + selected.title + '!');
        $scope.tabChanged(selected, current);
      }
    });

    $scope.tabChanged = function (selected, current) {
      selected.content = frevents.getByDateEvents(selected.title);
      var nextDate = frevents.getNextDay(
        selected.date.year + '-' + selected.date.month + '-' + selected.date.day);
      $scope.addTab(nextDate.full, "", nextDate, current);
    }

    $scope.addTab = function (title, view, date, current) {
      if(current + 1 >= tabs.length) {
        tabs.push({ title: title, date: date, content: view, disabled: false});
      }
      else if(tabs.length === 0){
        tabs.push({ title: title, date: date, content: view, disabled: false});
      }
    };

    $scope.removeTab = function (tab) {
      var index = tabs.indexOf(tab);
      tabs.splice(index, 1);
    };


    $scope.initialize();

  });
