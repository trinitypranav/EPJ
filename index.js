const express = require("express"); // returns a function to create a backend/ web app
const app = express();

const courses = [
  { id: 1, name: "course1 - JavaScript" },
  { id: 2, name: "course2 - SQL" },
  { id: 3, name: "course3 - React" },
];

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Express Demo app");
});

app.get("/api/courses", (req, res) => {
  res.status(200).send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((course) => course.id === parseInt(id));
  if (!course) res.status(404).send(`Course with ${id} was not found`);

  res.status(200).send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express-demo is listening on port ${port}`)
);
