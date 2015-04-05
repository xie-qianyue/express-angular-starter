var app = angular.module('todoApp', [
    'ngRoute'
]);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
        'use strict';

        $locationProvider.html5Mode(true);

        $routeProvider.
        when('/about', {
            templateUrl: '/views/about.html'
        }).
        when('/todo', {
            templateUrl: '/views/todo.html',
            controller: 'todoController'
        }).
        otherwise({
            templateUrl: '/views/main.html'
        });
  }]);