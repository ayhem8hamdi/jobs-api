const jwt = require("jsonwebtoken");
const {userModel}= require("../models/user-model");
const {jobsModel}= require("../models/job-model");

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



async function isAuthorized(req,res,next){
    const tempJob= await jobsModel.findById(req.params.id);
    if (!tempJob) {
      return res.status(404).json({status:404,msg:'No Job Found With This Id'});
    }
    const userId= tempJob.createdBy;
    if ( userId.toString() !== (req.user._id).toString()) {
        return res.status(403).json({status:403,msg:"UnAuthorized Action"});
    }
    next();
}
module.exports = {authMiddleware,isAuthorized};
