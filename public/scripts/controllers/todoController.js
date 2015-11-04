// Implicit Annotation
// Careful: If you plan to minify your code, your service names will get renamed and break your app.
app.controller('todoController', ['$scope', '$filter', function ($scope, $filter) {
    'use strict';

    var todoList = this;

    // Use local storage.
    var todos = todoList.todos = [
        {
            title: 'Express 4X',
            completed: false
        },
        {
            title: 'Angular 1.3',
            completed: false
        }
    ];

    todoList.newTodo = '';
    todoList.editedTodo = null;

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
            completed: false
        };
        if (!newTodo.title) {
            return;
        }

        todos.push(newTodo);
        todoList.newTodo = '';
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

        todos[todos.indexOf(todoList.originalTodo)] = todo;

        todoList.editedTodo = null;
    };

    todoList.revertEdits = function (todo) {
        todos[todos.indexOf(todo)] = todoList.originalTodo;
        todoList.editedTodo = null;
        todoList.originalTodo = null;
        todoList.reverted = true;
    };

    todoList.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

    todoList.toggleCompleted = function (todo, completed) {
        if (angular.isDefined(completed)) {
            todo.completed = completed;
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