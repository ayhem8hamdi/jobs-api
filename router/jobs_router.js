const express = require("express");
const router = express.Router();
const {getAllJobs,createNewJob,deleteJobById,updateJobById,getJobById} = require("../controllers/jobs-controller")
const {authMiddleware}= require("../middlewares/auth-middleware");

router.route("/").get(getAllJobs).post(authMiddleware,createNewJob)
router.route("/:id").get(authMiddleware,getJobById).patch(authMiddleware,updateJobById).delete(authMiddleware,deleteJobById)



module.exports = router;