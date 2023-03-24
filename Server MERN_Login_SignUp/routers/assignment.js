const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, validateSignup, validateSignin } = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

//middleware
const auth = require("../middlewares/AuthToken");

router.get("/", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/signup", async (req, res) => {
  const { error } = validateSignup(req.body);
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
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.send(token);
    })
    .catch((err) => res.send(err.message));
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const { error } = validateSignin(req.body);
  if (error) return res.send(error.details[0].message);

  const user = await User.findOne({ email: email });
  if (!user) return res.status(404).send("Invalid credentials");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid email or password!!!");

  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
  res.send(token);
});

module.exports = router;
