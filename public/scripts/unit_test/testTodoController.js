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
	
	describe('removeTodo', function(){
		it('should remove a todo item in the todo list', inject(function($controller, $rootScope){
			scope = $rootScope.$new();
			var myController = $controller('todoController', {
          		$scope: scope
     		});
			 
			var testItem = {title: 'Test item', completed: false};
			 
			myController.todos.pop(testItem);
			myController.removeTodo(testItem);
			
			myController.todos.length.should.equal(0);			
		}));
	});
});