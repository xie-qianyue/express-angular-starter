app.controller('mongoTodoController', ['$scope', '$filter','todoService', function ($scope, $filter, todoService) {
    'use strict';

    var todoList = this;

    // Retrieve data from mongodb, by angular service.
    var todos = todoList.todos = [];
    todoService.getTodo()
        .then(function(data){
            todos = todoList.todos = data;
        },
        function(errorMsg){
            console.log(errorMsg);
        });

    todoList.newTodo = '';
    todoList.editedTodo = null;

    // Watch remaining count.
    $scope.$watch(function () {
            return todos;
        }, function () {
            todoList.remainingCount = $filter('filter')(todos, { completed: false }).length;
            todoList.completedCount = todos.length - todoList.remainingCount;
            todoList.allChecked = !todoList.remainingCount;
    }, true);

    todoList.addTodo = function () {
        var newTodo = {
            title: todoList.newTodo.trim(),
        };
        if (!newTodo.title) {
            return;
        }

        todoService.createTodo(newTodo)
            .then(function(data){
                todos = todoList.todos = data;
            },
            function(errorMsg){
                console.log(errorMsg);
            });

        todoList.newTodo = '';
    };

    todoList.removeTodo = function (todo) {
        todoService.deleteTodo(todo._id)
            .then(function(data){
                todos = todoList.todos = data;
            },
            function(errorMsg){
                console.log(errorMsg);
            });
    };

    // Make css style effective.
    todoList.editTodo = function (todo) {
        todoList.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        todoList.originalTodo = angular.extend({}, todo);
    };

    todoList.saveEdits = function (todo, event) {
        // Blur events are automatically triggered after the form submit event.
        // This does some unfortunate logic handling to prevent saving twice.
        if (event === 'blur' && todoList.saveEvent === 'submit') {
            todoList.saveEvent = null;
            return;
        }
        todoList.saveEvent = event;
        
        if (todoList.reverted) {
            // Todo edits were reverted-- don't save.
            todoList.reverted = null;
            return;
        }
        
        todo.title = todo.title.trim();
        if (todo.title === todoList.originalTodo.title) {
            todoList.editedTodo = null;
            return;
        }

        todoService.editTodo(todo);

        todoList.editedTodo = null;
    };

    todoList.revertEdits = function (todo) {
        todos[todos.indexOf(todo)] = todoList.originalTodo;
        todoList.editedTodo = null;
        todoList.originalTodo = null;
        todoList.reverted = true;
    };

    todoList.toggleCompleted = function (todo, completed) {
        if (angular.isDefined(completed)) {
            // Toggle all todo items by markAll
            todo.completed = completed;
            todoService.completeTodo(todo);
        } else {
            // Toggle one item
            todoService.completeTodo(todo);
        }
    };

    todoList.markAll = function (completed) {
        todos.forEach(function (todo) {
            if (todo.completed !== completed) {
                todoList.toggleCompleted(todo, completed);
            }
        });
    };
}]);