const express = require("express");
const router = express.Router();
const Joi = require("joi");

// this array contains all courses objects
const courses = [
  { id: 1, name: "course1 - JavaScript" },
  { id: 2, name: "course2 - SQL" },
  { id: 3, name: "course3 - React" },
];

// input validation schema for course object
const courseSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

router.get("/", (req, res) => {
  const query = req.query;
  if (query.name) {
    const result = courses.filter((course) => course.name.includes(query.name));
    return res.status(200).send(result);
  }
  res.status(200).send(courses);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((course) => course.id === parseInt(id));
  if (!course)
    return res.status(404).send(`Course with ID ${id} was not found`);

  res.status(200).send(course);
});

router.post("/", (req, res) => {
  // validates the input against schema
  const result = courseSchema.validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // no error i.e. input is validated. Update the database and return the newly created course object
  const newCourse = { ...req.body, id: courses.length + 1 };
  courses.push(newCourse);
  console.log(courses);
  res.status(201).send(newCourse);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const courseIndex = courses.findIndex((course) => course.id === parseInt(id));
  if (courseIndex === -1)
    return res.status(404).send(`Course with ID ${id} was not found`);

  const { error } = courseSchema.validate(req.body);
  if (error) return res.status(400).send(`Bad Request`);

  courses[courseIndex] = { ...courses[courseIndex], ...req.body };
  console.log(courses);
  res.status(200).send(`Course with ID ${id} has been updated`);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const courseIndex = courses.findIndex((course) => course.id === parseInt(id));
  if (courseIndex === -1)
    return res.status(404).send(`Course with ID ${id} was not found`);

  res.status(200).send(courses.splice(courseIndex, 1));
});

module.exports = router;
