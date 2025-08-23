require("dotenv").config();
const express=require("express");
const app = express();
const {connectToDB} = require("./config/db-connection");
const {notFoundHandler,errorHandler}=  require("./middlewares/errors-middleware");
const authRouter= require("./router/auth-router");

// DataBase Connection 
connectToDB();

// Middleware
app.use(express.json());

//routes
app.use('/api/v1/auth',authRouter);
app.use("/api/v1",(req,res,next)=>{
    res.send("Welcome to jobs api");
});

// Error + Not Found Handle
app.use(notFoundHandler);
app.use(errorHandler);



app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});
