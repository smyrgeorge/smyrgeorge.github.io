'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('MainCtrl', function () {

    console.log(parseInt("01", 10));

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
