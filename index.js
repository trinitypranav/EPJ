const express = require("express"); // returns a function to create a backend/ web app
const Joi = require("joi");

const app = express();
app.use(express.json()); // middleware for handling JSON parsing of request body

const courses = [
  { id: 1, name: "course1 - JavaScript" },
  { id: 2, name: "course2 - SQL" },
  { id: 3, name: "course3 - React" },
];

const courseSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Express Demo app");
});

app.get("/api/courses", (req, res) => {
  const query = req.query;
  if (query) {
    const result = courses.filter((course) => course.name.includes(query.name));
    res.status(200).send(result);
  }
  res.status(200).send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((course) => course.id === parseInt(id));
  if (!course)
    return res.status(404).send(`Course with ID ${id} was not found`);

  res.status(200).send(course);
});

app.post("/api/courses", (req, res) => {
  const result = courseSchema.validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const newCourse = { ...req.body, id: courses.length + 1 };
  courses.push(newCourse);
  console.log(courses);
  res.status(201).send(newCourse);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express-demo is listening on port ${port}`)
);
