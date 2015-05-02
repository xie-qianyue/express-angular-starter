app.factory('todoService', ['$http', '$q', function($http, $q){

	// service interface
	var service = {
		getTodo: getTodo,
		createTodo: createTodo,
		deletetodo: deletetodo		
	}

	// return a promise object
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
		$http.post('/api/todos', todo)
			.success(function(data){

			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}

	function deletetodo() {

	}

	return service;
}]);