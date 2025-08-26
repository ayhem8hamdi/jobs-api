const asyncHandler= require("express-async-handler");
const {jobsModel} = require("../models/job-model");
const {buildJobsFilter ,buildSort , buildPagination}= require("../helper/querying-logic");

const getAllJobs= asyncHandler(
    async (req,res,next)=>{
        const filter = buildJobsFilter(req.query);
        const sort= buildSort(req.query.sort);
        const {  limit, skip } = buildPagination(req.query);
        const jobs = await jobsModel
        .find({ createdBy: req.user._id ,...filter})
        .sort(sort)
        .skip(skip)
        .limit(limit);
    if (!jobs || jobs.length === 0) {
        return res.status(404).json({ message: "No jobs found" });
    }
    return res.status(200).json({status:200,count:jobs.length,jobs});

    }
);

// Create New Job Controller 

const createNewJob= asyncHandler(
    async (req,res,next)=>{
       req.body.createdBy= req.user._id;
       const newJob= await jobsModel.create(req.body);
       if (!newJob) {
        return res.status(500).json({status:500,msg:"there was an error try again later"});
       }
       res.status(201).json({status:201,msg:"Job has been created successfully",newJob});
    }
);





// Delete Job Controller : 

const deleteJobById= asyncHandler(
    async (req,res,next)=>{
        const deletedJob = await jobsModel.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(500).json({status:500,msg:'Internal Error'});
        }
        res.status(200).json({status:200,msg:'job deleted successfully',deletedJob})
    }
);




// Update Job By Id Controller :

const updateJobById= asyncHandler(
    async (req,res,next)=>{
    const updatedJob = await jobsModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
    );
    if (!updatedJob) {
        return res.status(500).json({status:500,msg:'Internal Server Error'});
    }
    return res.status(200).json({status:200,msg:'job updated successfully',updatedJob})
    }
);


const getJobById= asyncHandler(
    async (req,res,next)=>{
        res.send("Get Job By Id");
    }
);


module.exports={getAllJobs,createNewJob,deleteJobById,updateJobById,getJobById}