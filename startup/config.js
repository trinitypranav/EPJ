module.exports = function (app) {
  console.log("Running Environment: ", app.get("env")); // if not defined, it returns 'development' by default

  // winston will catch it
  if (!process.env.jwtKey) {
    throw new Error("FATAL ERROR - no private key found for JWT signing");
  }

  if (!process.env.mongodbUrl) {
    throw new Error("FATAL ERROR - no URL found to connect to MongoDB");
  }
};
