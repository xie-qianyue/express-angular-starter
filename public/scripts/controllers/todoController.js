app.controller('todoController', ['$scope', '$filter', function ($scope, $filter) {

    var todos = $scope.todos = [
    {
        title: 'Express 4X',
        completed: false
    },
    {
        title: 'Angular 1.3',
        completed: false
    }
    ];

    $scope.newTodo = '';
    $scope.editedTodo = null;

    $scope.$watch('todos', function () {
        $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
        $scope.completedCount = todos.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
    }, true);

    $scope.addTodo = function () {
        var newTodo = {
            title: $scope.newTodo.trim(),
            completed: false
        };
        if (!newTodo.title) {
            return;
        }

        todos.push(newTodo);
        $scope.newTodo = '';
        // $scope.saving = true;
        // store.insert(newTodo)
        // .then(function success() {
        //     $scope.newTodo = '';
        // })
        // .finally(function () {
        //     $scope.saving = false;
        // });
    };

    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        $scope.originalTodo = angular.extend({}, todo);
    };

    $scope.saveEdits = function (todo, event) {
        // Blur events are automatically triggered after the form submit event.
        // This does some unfortunate logic handling to prevent saving twice.
        if (event === 'blur' && $scope.saveEvent === 'submit') {
            $scope.saveEvent = null;
            return;
        }
        $scope.saveEvent = event;
        if ($scope.reverted) {
            // Todo edits were reverted-- don't save.
            $scope.reverted = null;
            return;
        }
        todo.title = todo.title.trim();
        if (todo.title === $scope.originalTodo.title) {
            $scope.editedTodo = null;
            return;
        }

        todos[todos.indexOf($scope.originalTodo)] = todo;

        $scope.editedTodo = null;
        // store[todo.title ? 'put' : 'delete'](todo)
        // .then(function success() {}, function error() {
        //     todo.title = $scope.originalTodo.title;
        // })
        // .finally(function () {
        //     $scope.editedTodo = null;
        // });
    };

    $scope.revertEdits = function (todo) {
        todos[todos.indexOf(todo)] = $scope.originalTodo;
        $scope.editedTodo = null;
        $scope.originalTodo = null;
        $scope.reverted = true;
    };

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

    $scope.toggleCompleted = function (todo, completed) {
        if (angular.isDefined(completed)) {
            todo.completed = completed;
        }
        // store.put(todo, todos.indexOf(todo))
        // .then(function success() {}, function error() {
        //     todo.completed = !todo.completed;
        // });
    };

    $scope.markAll = function (completed) {
        todos.forEach(function (todo) {
            if (todo.completed !== completed) {
                $scope.toggleCompleted(todo, completed);
            }
        });
    };
}]);