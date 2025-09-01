const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // This is REQUIRED for parsing JSON bodies

// Import routes
const authRoutes = require('./routes/auth');
const predictionRoutes = require('./routes/predictions');
const appointmentRoutes = require('./routes/appointments');

// Database connection with better error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/HealthyHeart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected to HealthyHeart database'))
.catch(err => {
  console.log('MongoDB connection error:', err.message);
  console.log('Server will start without database connection');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/appointments', appointmentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.json({
    status: 'OK',
    message: 'HealthyHeart API is running',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// ML Model endpoint - proxy to Python Flask server
app.post('/api/predict', async (req, res) => {
  try {
    // Try to use the actual ML service
    const response = await axios.post('http://localhost:5001/predict', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('ML service error, falling back to mock prediction:', error.message);
    
    // Fallback to mock prediction if ML service is unavailable
    const mockData = req.body;
    const riskScore = calculateMockRisk(mockData);
    const hasDisease = riskScore > 0.6;
    
    res.json({
      prediction: hasDisease,
      riskScore: riskScore,
      message: hasDisease 
        ? 'Our model indicates you may be at risk of heart disease. We recommend booking an appointment with a specialist.' 
        : 'Our model indicates you have a low risk of heart disease. Maintain a healthy lifestyle!',
      note: 'Note: This is a mock prediction as the ML service is temporarily unavailable.'
    });
  }
});

// Helper function for mock risk calculation
function calculateMockRisk(data) {
  let risk = 0;
  
  // Age factor
  if (data.age > 50) risk += 0.2;
  else if (data.age > 40) risk += 0.1;
  
  // Blood pressure factor
  if (data.resting_blood_pressure > 140) risk += 0.2;
  else if (data.resting_blood_pressure > 130) risk += 0.1;
  
  // Cholesterol factor
  if (data.cholestoral > 240) risk += 0.2;
  else if (data.cholestoral > 200) risk += 0.1;
  
  // Heart rate factor
  if (data.max_heart_rate < 120) risk += 0.1;
  
  // ST depression factor
  if (data.oldpeak > 2) risk += 0.2;
  else if (data.oldpeak > 1) risk += 0.1;
  
  // Sex factor (male higher risk)
  if (data.sex === 'Male') risk += 0.1;
  
  // Exercise induced angina factor
  if (data.exercise_induced_angina === 'Yes') risk += 0.2;
  
  // Ensure risk is between 0 and 1
  return Math.min(1, Math.max(0, risk));
}

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on the server'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});