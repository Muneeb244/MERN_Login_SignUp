const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {User} = require('../models/user');

module.exports = async function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    if(!decoded) return res.status(400).send('Invalid token.');

    const user  = await User.findById(decoded._id);
    if (!user) return res.status(400).send('Invalid credentials.');
    req.user = user;
    next();
}