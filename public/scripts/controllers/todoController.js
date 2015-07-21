app.controller('todoController', ['$scope', '$filter', function ($filter) {
    'use strict';

    // Use local storage.
    var todos = this.todos = [
    {
        title: 'Express 4X',
        completed: false
    },
    {
        title: 'Angular 1.3',
        completed: false
    }
    ];

    this.newTodo = '';
    this.editedTodo = null;

    this.$watch('todos', function () {
        this.remainingCount = $filter('filter')(todos, { completed: false }).length;
        this.completedCount = todos.length - this.remainingCount;
        this.allChecked = !this.remainingCount;
    }, true);

    this.addTodo = function () {
        var newTodo = {
            title: this.newTodo.trim(),
            completed: false
        };
        if (!newTodo.title) {
            return;
        }

        todos.push(newTodo);
        this.newTodo = '';
    };

    // Make css style effective.
    this.editTodo = function (todo) {
        this.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        this.originalTodo = angular.extend({}, todo);
    };

    this.saveEdits = function (todo, event) {
        // Blur events are automatically triggered after the form submit event.
        // This does some unfortunate logic handling to prevent saving twice.
        if (event === 'blur' && this.saveEvent === 'submit') {
            this.saveEvent = null;
            return;
        }
        this.saveEvent = event;
        if (this.reverted) {
            // Todo edits were reverted-- don't save.
            this.reverted = null;
            return;
        }
        todo.title = todo.title.trim();
        if (todo.title === this.originalTodo.title) {
            this.editedTodo = null;
            return;
        }

        todos[todos.indexOf(this.originalTodo)] = todo;

        this.editedTodo = null;
    };

    this.revertEdits = function (todo) {
        todos[todos.indexOf(todo)] = this.originalTodo;
        this.editedTodo = null;
        this.originalTodo = null;
        this.reverted = true;
    };

    this.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

    this.toggleCompleted = function (todo, completed) {
        if (angular.isDefined(completed)) {
            todo.completed = completed;
        }
    };

    this.markAll = function (completed) {
        todos.forEach(function (todo) {
            if (todo.completed !== completed) {
                this.toggleCompleted(todo, completed);
            }
        });
    };
}]);