'use strict';

var app = angular.module('todoApp', [
    'ui.router'
]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('about', {
        url:'/about',
        templateUrl: '/views/about.html'
    })
    .state('localTodo', {
        url:'/localTodo',
        templateUrl: '/views/todo.html',            
        controllerAs: 'todoCtrl',
        controller: 'todoController'
    })
    .state('mongoTodo', {
        url:'/mongoTodo',
        templateUrl: '/views/todo.html',
        controllerAs: 'todoCtrl',
        controller: 'mongoTodoController'
    })
    .state('/', {
        url:'/',
        templateUrl: '/views/main.html'
    });
});