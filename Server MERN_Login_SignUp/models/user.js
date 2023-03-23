const mongoose = require('mongoose');
const joi = require('joi');

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255

    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255

    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    dob: {
        type: String,
        required: true
    }
});

const validateUser = (user) => {
    const Schema = joi.object({
        name: joi.string().min(3).max(255).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required(),
        dob: joi.string().required(),
    })
    return Schema.validate(user);
}

const User = mongoose.model('User', userScheme);

module.exports.User = User;
module.exports.validateUser = validateUser;