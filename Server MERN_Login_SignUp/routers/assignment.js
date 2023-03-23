const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, validateUser } = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.post("/signup", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.send(error.details[0].message);

  const duplicate = await User.findOne({ email: req.body.email });
  if (duplicate) return res.send("user already exists");

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
  });

  user = await user
    .save()
    .then(() => {
      const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
      res.send(token);
    })
    .catch((err) => res.send(err.message));
    
});

module.exports = router;
