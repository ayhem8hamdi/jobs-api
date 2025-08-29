require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const path = require("path");

const { connectToDB } = require("./config/db-connection");
const { notFoundHandler, errorHandler } = require("./middlewares/errors-middleware");
const authRouter = require("./router/auth-router");
const jobsRouter = require("./router/jobs_router");

// Connect to DB
connectToDB();

// Load Swagger YAML safely
const swaggerDocumentation = yaml.load(path.join(__dirname, "swagger.yaml"));

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.set('trust proxy', 1); 
app.use(express.json());

// Root route with absolute URL to docs
app.get("/", (req, res) => {
    const baseUrl = process.env.BASE_URL || ""; 
    res.send(`
        <h1>Jobs API</h1>
        <br>
        <a href='${baseUrl}/api-docs'>Documentation</a>
    `);
});

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
