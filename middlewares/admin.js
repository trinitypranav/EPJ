module.exports = function (req, res) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
};

// 401 - Unauthorized - when user accesses protected resource but they don't supply valid token. User can retry.
// 403 - Forbidden - User has supplied a valid token but he is forbidden from accessing the resource. No use of retrying.
