const asyncHandler= require("express-async-handler");


const getAllJobs= asyncHandler(
    async (req,res,next)=>{
       const  {user} = req.body;
            res.json(user);
    }
);


const createNewJob= asyncHandler(
    async (req,res,next)=>{
        res.send("New Job Created");
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