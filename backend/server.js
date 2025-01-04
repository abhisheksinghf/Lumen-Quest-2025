// server.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

// Import routes
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize dotenv for environment variables
dotenv.config();

// Create an instance of Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Setup routes
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
