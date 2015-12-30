'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('ModalCtrl', function($scope, $mdDialog, $mdMedia) {
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showAlert = function(ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('This is an alert title')
          .textContent('You can specify some description text in here.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };
  });
