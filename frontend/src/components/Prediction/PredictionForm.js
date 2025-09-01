import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { predictHeartDisease } from '../../services/api';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'Male',
    chest_pain_type: 'Typical angina',
    resting_blood_pressure: '',
    cholestoral: '',
    fasting_blood_sugar: 'Lower than 120 mg/ml',
    rest_ecg: 'Normal',
    max_heart_rate: '',
    exercise_induced_angina: 'No',
    oldpeak: '',
    slope: 'Flat',
    vessels_colored: 'Zero',
    thalassemia: 'Normal'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await predictHeartDisease(formData);
      setPrediction(result);
      toast.success('Prediction completed successfully!');
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error(error.message || 'Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-form">
      <h2>Heart Disease Risk Assessment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="120"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Sex</label>
            <select
              name="sex"
              className="form-select"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Chest Pain Type</label>
            <select
              name="chest_pain_type"
              className="form-select"
              value={formData.chest_pain_type}
              onChange={handleChange}
              required
            >
              <option value="Typical angina">Typical angina</option>
              <option value="Atypical angina">Atypical angina</option>
              <option value="Non-anginal pain">Non-anginal pain</option>
              <option value="Asymptomatic">Asymptomatic</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Resting Blood Pressure</label>
            <input
              type="number"
              name="resting_blood_pressure"
              className="form-control"
              value={formData.resting_blood_pressure}
              onChange={handleChange}
              required
              min="80"
              max="200"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Cholestoral (mg/dl)</label>
            <input
              type="number"
              name="cholestoral"
              className="form-control"
              value={formData.cholestoral}
              onChange={handleChange}
              required
              min="100"
              max="600"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Fasting Blood Sugar</label>
            <select
              name="fasting_blood_sugar"
              className="form-select"
              value={formData.fasting_blood_sugar}
              onChange={handleChange}
              required
            >
              <option value="Lower than 120 mg/ml">Lower than 120 mg/ml</option>
              <option value="Greater than 120 mg/ml">Greater than 120 mg/ml</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Resting ECG</label>
            <select
              name="rest_ecg"
              className="form-select"
              value={formData.rest_ecg}
              onChange={handleChange}
              required
            >
              <option value="Normal">Normal</option>
              <option value="ST-T wave abnormality">ST-T wave abnormality</option>
              <option value="Left ventricular hypertrophy">Left ventricular hypertrophy</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Max Heart Rate</label>
            <input
              type="number"
              name="max_heart_rate"
              className="form-control"
              value={formData.max_heart_rate}
              onChange={handleChange}
              required
              min="60"
              max="220"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Exercise Induced Angina</label>
            <select
              name="exercise_induced_angina"
              className="form-select"
              value={formData.exercise_induced_angina}
              onChange={handleChange}
              required
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Oldpeak</label>
            <input
              type="number"
              step="0.1"
              name="oldpeak"
              className="form-control"
              value={formData.oldpeak}
              onChange={handleChange}
              required
              min="0"
              max="10"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Slope</label>
            <select
              name="slope"
              className="form-select"
              value={formData.slope}
              onChange={handleChange}
              required
            >
              <option value="Flat">Flat</option>
              <option value="Upsloping">Upsloping</option>
              <option value="Downsloping">Downsloping</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Vessels Colored by Flourosopy</label>
            <select
              name="vessels_colored"
              className="form-select"
              value={formData.vessels_colored}
              onChange={handleChange}
              required
            >
              <option value="Zero">Zero</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
              <option value="Four">Four</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Thalassemia</label>
            <select
              name="thalassemia"
              className="form-select"
              value={formData.thalassemia}
              onChange={handleChange}
              required
            >
              <option value="Normal">Normal</option>
              <option value="Fixed Defect">Fixed Defect</option>
              <option value="Reversable Defect">Reversable Defect</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Predict Risk'}
        </button>
      </form>

      {prediction && (
        <div className={`prediction-result ${prediction.prediction ? 'high-risk' : 'low-risk'}`}>
          <h3>Prediction Results</h3>
          <p><strong>Risk Level:</strong> {prediction.prediction ? 'High Risk' : 'Low Risk'}</p>
          <p><strong>Risk Score:</strong> {(prediction.riskScore * 100).toFixed(2)}%</p>
          <p>{prediction.message}</p>
          {prediction.note && <p className="text-muted">{prediction.note}</p>}
          {prediction.prediction && (
            <button 
              onClick={() => window.location.href = '/appointment'}
              className="btn btn-secondary mt-3"
            >
              Book Appointment with Specialist
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;