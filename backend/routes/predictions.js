const express = require('express');
const auth = require('../middleware/auth');
const Prediction = require('../models/Prediction');

const router = express.Router();

// Get all predictions for a user
router.get('/', auth, async (req, res) => {
  try {
    const predictions = await Prediction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(predictions);
  } catch (err) {
    console.error('Get predictions error:', err.message);
    res.status(500).send('Server Error');
  }
});

// Save a prediction
router.post('/', auth, async (req, res) => {
  try {
    const { 
      age, sex, chest_pain_type, resting_blood_pressure, 
      cholestoral, fasting_blood_sugar, rest_ecg, max_heart_rate, 
      exercise_induced_angina, oldpeak, slope, vessels_colored, 
      thalassemia, prediction, riskScore 
    } = req.body;

    const newPrediction = new Prediction({
      user: req.user.id,
      age, sex, chest_pain_type, resting_blood_pressure, 
      cholestoral, fasting_blood_sugar, rest_ecg, max_heart_rate, 
      exercise_induced_angina, oldpeak, slope, vessels_colored, 
      thalassemia, prediction, riskScore
    });

    const savedPrediction = await newPrediction.save();
    res.json(savedPrediction);
  } catch (err) {
    console.error('Save prediction error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;