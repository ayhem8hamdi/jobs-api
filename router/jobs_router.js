const express = require("express");
const router = express.Router();
const {getAllJobs,createNewJob,deleteJobById,updateJobById,getJobById} = require("../controllers/jobs-controller")


router.route("/").get(getAllJobs).post(createNewJob)
router.route("/:id").get(getJobById).patch(updateJobById).delete(deleteJobById)



module.exports = router;