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
        when('/localTodo', {
            templateUrl: '/views/todo.html',            
            controllerAs: 'todoCtrl',
            controller: 'todoController'
        }).
        when('/mongoTodo', {
            templateUrl: '/views/todo.html',
            controllerAs: 'todoCtrl',
            controller: 'mongoTodoController'
        }).
        otherwise({
            templateUrl: '/views/main.html'
        });
  }]);