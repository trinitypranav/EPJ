function logger(req, res, next) {
  console.log("\nLogger middleware called...");
  console.log("Request Body: ", req.body);
  console.log("Request Params: ", req.params);
  console.log("Request Headers: ", req.headers);
  next();
}

module.exports = logger;
