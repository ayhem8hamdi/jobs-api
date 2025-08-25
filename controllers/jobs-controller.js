const asyncHandler= require("express-async-handler");
const {jobsModel,createJobValidation} = require("../models/job-model");

const getAllJobs= asyncHandler(
    async (req,res,next)=>{
       const  {user} = req.body;
            res.json(user);
    }
);


const createNewJob= asyncHandler(
    async (req,res,next)=>{

    const { error } = createJobValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      details: error.details.map(err => err.message), 
    });
  }
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
               const  user = req.user;
            res.json(user);
    }
);


const updateJobById= asyncHandler(
    async (req,res,next)=>{
        res.send("Update Job By Id");
    }
);


const getJobById= asyncHandler(
    async (req,res,next)=>{
        res.send("Get Job By Id");
    }
);


module.exports={getAllJobs,createNewJob,deleteJobById,updateJobById,getJobById}