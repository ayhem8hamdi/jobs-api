const express = require("express");
const router = express.Router();
const {getAllJobs,createNewJob,deleteJobById,updateJobById,getJobById} = require("../controllers/jobs-controller")
const {authMiddleware,isAuthorized}= require("../middlewares/verify-token_middleware");
const {addJobValidation,updateJobValidator}= require("../middlewares/job-validation-middleware");



router.route("/").get(authMiddleware,getAllJobs).post(authMiddleware,addJobValidation,createNewJob)
router.route("/:id").get(authMiddleware,isAuthorized,getJobById).patch(authMiddleware,isAuthorized,updateJobValidator,updateJobById).delete(authMiddleware,isAuthorized,deleteJobById)



module.exports = router;