//1. Backend (Node.js & Express) - API Setup
This is the core of the backend which will handle requests, data processing, and communication with the database.
// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Simple route for health check
app.get('/', (req, res) => {
  res.send('Smart Health Monitoring System API');
});

// Placeholder for user routes
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
