require("dotenv").config();
const express=require("express");
const app = express();
const {connectToDB} = require("./config/db-connection");
const {notFoundHandler,errorHandler}=  require("./middlewares/errors-middleware");
const authRouter= require("./router/auth-router");
const jobsRouter = require("./router/jobs_router");



// DataBase Connection 
connectToDB();


app.set('trust proxy',1)
// Middleware
app.use(express.json()); 



//routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',jobsRouter);
app.use(express.json());
app.use("/",(req,res,next)=>{
    res.send("Welcome to jobs api");
});

// Error + Not Found Handle
app.use(notFoundHandler);
app.use(errorHandler);



app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});
