var express = require('express');
var mongoose = require('mongoose');
var api = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost')

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

module.exports = api;