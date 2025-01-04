// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const apiRoutes = require('./routes/apiRoutes');

// Initialize dotenv for environment variables
dotenv.config();

// Create an instance of Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Setup routes
app.use('/api', apiRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
