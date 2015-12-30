'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('MainCtrl', function ($scope) {

    $scope.menu = [
    {
      link : '',
      title: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link : '',
      title: 'Friends',
      icon: 'group'
    },
    {
      link : '',
      title: 'Messages',
      icon: 'message'
    }
  ];

  $scope.admin = [
    {
      link : '',
      title: 'Trash',
      icon: 'delete'
    },
    {
      link : 'showListBottomSheet($event)',
      title: 'Settings',
      icon: 'settings'
    }
  ];

  });
