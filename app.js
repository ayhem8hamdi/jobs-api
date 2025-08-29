require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

const { connectToDB } = require("./config/db-connection");
const { notFoundHandler, errorHandler } = require("./middlewares/errors-middleware");
const authRouter = require("./router/auth-router");
const jobsRouter = require("./router/jobs_router");

const swaggerDocumentation = yaml.load("./swagger.yaml");

connectToDB();

const app = express();
app.use(cors());
app.set('trust proxy', 1);
app.use(express.json());

// Root route
app.use("/", (req, res) => {
    res.send("<h1>Jobs API</h1><br><a href='/api-docs'>Documentation</a>");
});

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
