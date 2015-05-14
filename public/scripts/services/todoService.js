app.factory('todoService', ['$http', '$q', function($http, $q){
	'use strict';

	// service interface
	var service = {
		getTodo: getTodo,
		createTodo: createTodo,
		deleteTodo: deleteTodo,
		editTodo: editTodo
	};

	// Return a promise object.
	function getTodo(){
		
		var def = $q.defer();

		$http.get('/api/todos')
			.success(function(data){
				def.resolve(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
				def.reject('Failed to get todos');
			});

		return def.promise;
	}

	function createTodo(todo) {

		var def = $q.defer();

		$http.post('/api/todos', todo)
			.success(function(data){
				def.resolve(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
				def.reject('Failed to add todo : ' + todo.title);
			});

		return def.promise;
	}

	function deleteTodo(todoId) {
		var def = $q.defer();

		 $http.delete('/api/todos/' + todoId)
			.success(function(data){
				def.resolve(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
				def.reject('Failed to delete todo with id : ' + todoId);
			});

		return def.promise;
	}

	// This function doesn't return a promise object.
	function editTodo(todo) {
		$http.put('/api/todos', todo)
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}

	return service;
}]);