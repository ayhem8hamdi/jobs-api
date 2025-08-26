const asyncHandler= require("express-async-handler");
const {jobsModel,updateJobValidation} = require("../models/job-model");

const getAllJobs= asyncHandler(
    async (req,res,next)=>{
       const  {user} = req.body;
            res.json(user);
    }
);


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


const deleteJobById= asyncHandler(
    async (req,res,next)=>{
        const deletedJob = await jobsModel.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(500).json({status:500,msg:'Internal Error'});
        }
        res.status(200).json({status:200,msg:'job deleted successfully',deletedJob})
    }
);


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