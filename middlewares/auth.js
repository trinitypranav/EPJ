const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied. No Token Provided");

  console.log("token is ", token);
  // we have a  token and we need to verify it
  try {
    const decoded = jwt.verify(token, process.env.jwtKey);
    req.user = decoded;
    console.log("decoded is ", decoded);
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
