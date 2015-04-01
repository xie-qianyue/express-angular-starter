var templateApp = angular.module('templateApp', [
    'ngRoute'
]);

templateApp.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
        'use strict';

        $locationProvider.html5Mode(true);

        $routeProvider.
        when('/about', {
            templateUrl: '/views/about.html'
        }).
        otherwise({
            templateUrl: '/views/main.html'
        });
  }]);