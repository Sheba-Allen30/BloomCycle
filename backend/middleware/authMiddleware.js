const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const token = authHeader.split(" ")[1]; // Bearer TOKEN
    const verified = jwt.verify(token, "secretkey");

    req.user = verified;
    next();

  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;