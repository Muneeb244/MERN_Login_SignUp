const mongoose = require('mongoose');
const joi = require('joi');

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
        minlength: 5,
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const validateTodo = (todo) => {
    const Schema = joi.object({
        todo: joi.string().min(5).required(),
    })
    return Schema.validate(todo);
}

const Todo = mongoose.model('Todo', todoSchema);

module.exports.todo = Todo;
module.exports.todoSchema = todoSchema;
module.exports.validateTodo = validateTodo;