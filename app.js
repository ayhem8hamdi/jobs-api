require("dotenv").config();
const express=require("express");
const app = express();
const {connectToDB} = require("./config/db-connection");
const {notFoundHandler,errorHandler}=  require("./middlewares/errors-middleware");
const authRouter= require("./router/auth-router");
const jobsRouter = require("./router/jobs_router");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");


// DataBase Connection 
connectToDB();


app.set('trust proxy',1)
// Middleware
app.use(express.json());

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(xss());
const limiter = rateLimit({
    windowMs: 10 * 60 *1000,
    max:100
});

app.use(limiter);

//routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',jobsRouter);
app.use("/api/v1",(req,res,next)=>{
    res.send("Welcome to jobs api");
});

// Error + Not Found Handle
app.use(notFoundHandler);
app.use(errorHandler);



app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});
