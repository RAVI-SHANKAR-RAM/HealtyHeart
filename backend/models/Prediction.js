const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  chest_pain_type: {
    type: String,
    required: true
  },
  resting_blood_pressure: {
    type: Number,
    required: true
  },
  cholestoral: {
    type: Number,
    required: true
  },
  fasting_blood_sugar: {
    type: String,
    required: true
  },
  rest_ecg: {
    type: String,
    required: true
  },
  max_heart_rate: {
    type: Number,
    required: true
  },
  exercise_induced_angina: {
    type: String,
    required: true
  },
  oldpeak: {
    type: Number,
    required: true
  },
  slope: {
    type: String,
    required: true
  },
  vessels_colored: {
    type: String,
    required: true
  },
  thalassemia: {
    type: String,
    required: true
  },
  prediction: {
    type: Boolean,
    required: true
  },
  riskScore: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prediction', PredictionSchema);