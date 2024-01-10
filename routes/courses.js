const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Course = require("../models/courseModel");

// input validation schema for course object
const courseSchema = Joi.object({
  name: Joi.string().min(2).required(),
  author: Joi.string().min(2).max(55).required(),
  tags: Joi.array(),
  price: Joi.number().required(),
  isPublished: Joi.boolean(),
});

router.get("/", async (req, res) => {
  try {
    const result = await Course.find().sort("name");
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const document = await Course.findById(req.params.id);
    res.status(200).send(document);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  // validates the input against schema
  const result = courseSchema.validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const newCourse = new Course(req.body);
  const response = await newCourse.save();
  console.log(response);
  res.status(201).send(newCourse);
});

router.put("/:id", async (req, res) => {
  try {
    // Not required
    // const { error } = courseSchema.validate(req.body);
    // if (error) return res.status(400).send(`Bad Request`);

    // find the record with provided id and updated the specific part of the document as per provided request body
    // no need to pass complete object here
    const foundDocument = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send(foundDocument);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedDocument = await Course.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedDocument);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
