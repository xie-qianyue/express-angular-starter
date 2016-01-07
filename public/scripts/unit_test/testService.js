describe('todoServiceTest', function(){
		
	var todoService, $httpBackend;
	
	beforeEach(module('todoApp'));
	beforeEach(inject(function (_todoService_, _$httpBackend_) {
		todoService = _todoService_; 
		$httpBackend = _$httpBackend_;
	}));

	describe('createTodo', function(){
		it('should create a todo item on the server', function(){
			
			var testItem = {
				title: 'testItem',
				completed: false
			};
			
			$httpBackend.expectPOST('/api/todos', testItem).respond('200', testItem);
			
			var success = false;
		
			todoService.createTodo(testItem)
				.then(function(){
					success = true;
				});
				
			$httpBackend.flush();
			expect(success).to.be.true;	
		});		
	});
	

});