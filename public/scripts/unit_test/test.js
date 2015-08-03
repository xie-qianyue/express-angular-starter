describe('todoController', function(){
	beforeEach(module('todoApp'));

	describe('addTodo', function(){
		it('should add a todo item in the todo list', inject(function($controller, $rootScope){
			scope = $rootScope.$new();
			var myController = $controller('todoController', {
          		$scope: scope
     		});

			myController.newTodo = 'test';
			myController.addTodo();

			var testTodo = myController.todos.pop();
			testTodo.title.should.equal('test');
			testTodo.completed.should.equal(false);
		}));
	});
});