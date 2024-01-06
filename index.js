const express = require("express"); // returns a function to create a backend/ web app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Express Demo app");
});

app.listen(8080, () => console.log("Express-demo is listening on port 8080"));
