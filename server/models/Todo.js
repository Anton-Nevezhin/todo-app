const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	title  : {type: String, required: true},
	done   : {type: Boolean, required: true}
});

const Todo = mongoose.model('Todo', TodoSchema);