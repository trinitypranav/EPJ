const express = require("express"); // returns a function to create a backend/ web app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Express Demo app");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express-demo is listening on port ${port}`)
);
