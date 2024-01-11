const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(55).required(),
  email: Joi.string().min(2).max(55).required().email(),
  password: Joi.string().min(2).max(55).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().min(2).max(55).required().email(),
  password: Joi.string().min(2).max(55).required(),
});

router.post("/register", async (req, res) => {
  try {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken(); // method is added on userModel mongoose schema

    res
      .header("x-auth-token", token)
      .status(201)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    res.send(token);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
