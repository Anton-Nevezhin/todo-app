const mongoose =  require("mongoose");
const config = require('../config/config.json');
require('../models/Todo');
mongoose.Promise = global.Promise;
const Todo = mongoose.model('Todo');


function setUpConnection() {
	mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`)

  
}

function listTodos(){
	return Todo.find();
}

function createTodo(data) {
	const todo = new Todo({
		title: data.title,
		done: false
	});
	return todo.save();
}


function deleteTodo(id){
	return Todo.findById(id).remove();
}

function updateTodo(id, data){
  if(data.title){
    return Todo.findByIdAndUpdate(id,{$set: {title: data.title}}, {new: true});
  }else{
    return Todo.findByIdAndUpdate(id,{$set: {done: data.done}}, {new: true });
  }
}




module.exports = {
	 setUpConnection,
	 listTodos,
	 createTodo,
	 deleteTodo,
   updateTodo
}