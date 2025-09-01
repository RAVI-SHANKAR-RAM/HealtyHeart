const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple health endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Test server is running',
    timestamp: new Date().toISOString()
  });
});

// Simple test registration endpoint
app.post('/api/auth/register', (req, res) => {
  console.log('Received registration data:', req.body);
  
  // Simulate a successful registration
  res.json({
    token: 'test_jwt_token_' + Date.now(),
    user: {
      id: 'test_user_id_' + Date.now(),
      name: req.body.name,
      email: req.body.email
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
});