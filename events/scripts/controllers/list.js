'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('ListCtrl', function ($scope, $location, FacebookAuthenticationService, FirebaseUserEventsService, $mdDialog, $mdMedia) {

    //is used to determine the selected tab
    $scope.selectedIndex = -1;

    $scope.fbauth = FacebookAuthenticationService;
    $scope.frevents = FirebaseUserEventsService;

    //check login status
    if(!$scope.fbauth.loggedIn){
      $scope.fbauth.getLoginStatus();
    }

    //attach events from firebase to view
    $scope.attending = $scope.frevents.getAttending();
    $scope.maybeAttending = $scope.frevents.getMaybeAttending();
    $scope.notReplied =$scope.frevents.getNotReplied();
    $scope.declined =$scope.frevents.getDeclined();

    //redirect to the desire event
    $scope.go = function ( path ) {
      $location.path( path );
    };

    //show map with events
    $scope.showAdvanced = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));//  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'views/templates/dialog_google_maps.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };



    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      // console.log(selectedIndex);

      $scope.map = {
        center: {
          latitude: 40.1451,
          longitude: -99.6680
        },
        zoom: 4,
        bounds: {}
      };

      var createRandomMarker = function(i, bounds, idKey) {
        var lat_min = bounds.southwest.latitude,
          lat_range = bounds.northeast.latitude - lat_min,
          lng_min = bounds.southwest.longitude,
          lng_range = bounds.northeast.longitude - lng_min;

        if (idKey == null) {
          idKey = "id";
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);
        var ret = {
          latitude: latitude,
          longitude: longitude,
          title: 'm' + i
        };
        ret[idKey] = i;
        return ret;
      };
      $scope.randomMarkers = [];
      // Get the bounds from the map once it's loaded
      $scope.$watch(function() {
        return $scope.map.bounds;
      }, function(nv, ov) {
        // Only need to regenerate once
        if (!ov.southwest && nv.southwest) {
          var markers = [];
          for (var i = 0; i < 50; i++) {
            markers.push(createRandomMarker(i, $scope.map.bounds))
          }
          $scope.randomMarkers = markers;
        }
      }, true);
    }

  });
