function logger(req, res, next) {
  console.log("logger middleware called...");
  next();
}

module.exports = logger;
