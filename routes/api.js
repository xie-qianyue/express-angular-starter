var express = require('express');
var mongoose = require('mongoose');
var api = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost');

// define shcema
var todoSchema = new mongoose.Schema({
	title: String,
	completed: Boolean
});

// define model with a pre-exist collection 'todo'
var Todo = mongoose.model('Todo', todoSchema, 'todo');

api.get('/todos', function (req, res) {
	Todo.find(function(err, todos) {
		if(err){
			res.send(err);
		}
		console.log(todos);
		res.json(todos);
	});
});

// create a todo item
api.post('/todos', function (req, res) {
	Todo.create({
		title : req.body.title,
		completed : false
	}, function(err) {
		if (err) {
			res.send(err);
		}

        // get and return all the todos after create
        Todo.find(function(err, todos) {
        	if (err) {
        		res.send(err);
        	}		
        	res.json(todos);
        });
    });
});

// delete a todo item
api.delete('/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		if (err) {
			res.send(err);
		}

        // get and return all the todos after delete
        Todo.find(function(err, todos) {
        	if (err) {
        		res.send(err);
        	}
        	res.json(todos);
        });
    });
});

module.exports = api;