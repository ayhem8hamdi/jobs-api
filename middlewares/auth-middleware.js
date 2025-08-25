const jwt = require("jsonwebtoken");
const {userModel}= require("../models/user-model");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]; 

  if (!authHeader ) {
    return res.status(401).json({ message: "No token provided" });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "token should starts with Bearer" });
  }
  const token = authHeader.split(" ")[1]; 

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user= await userModel.findById(payload.userId).select("-password");
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = {authMiddleware};
