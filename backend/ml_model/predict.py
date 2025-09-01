from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import json

app = Flask(__name__)
CORS(app)

# Load the trained model and encoders
model = None
label_encoders = None
feature_mapping = None

def load_model():
    global model, label_encoders, feature_mapping
    try:
        with open('heart_disease_model.pkl', 'rb') as f:
            model = pickle.load(f)
        
        with open('label_encoders.pkl', 'rb') as f:
            label_encoders = pickle.load(f)
        
        with open('feature_mapping.json', 'r') as f:
            feature_mapping = json.load(f)
        
        print("ML model and encoders loaded successfully!")
    except Exception as e:
        print(f"Error loading model: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Prepare the input data
        input_data = {
            'age': float(data['age']),
            'sex': feature_mapping['sex'][data['sex']],
            'chest_pain_type': feature_mapping['chest_pain_type'][data['chest_pain_type']],
            'resting_blood_pressure': float(data['resting_blood_pressure']),
            'cholestoral': float(data['cholestoral']),
            'fasting_blood_sugar': feature_mapping['fasting_blood_sugar'][data['fasting_blood_sugar']],
            'rest_ecg': feature_mapping['rest_ecg'][data['rest_ecg']],
            'Max_heart_rate': float(data['max_heart_rate']),
            'exercise_induced_angina': feature_mapping['exercise_induced_angina'][data['exercise_induced_angina']],
            'oldpeak': float(data['oldpeak']),
            'slope': feature_mapping['slope'][data['slope']],
            'vessels_colored_by_flourosopy': feature_mapping['vessels_colored_by_flourosopy'][data['vessels_colored']],
            'thalassemia': feature_mapping['thalassemia'][data['thalassemia']]
        }
        
        # Convert to DataFrame
        input_df = pd.DataFrame([input_data])
        
        # Make prediction
        prediction = model.predict(input_df)
        prediction_proba = model.predict_proba(input_df)
        
        risk_score = float(prediction_proba[0][1])  # Probability of heart disease
        
        return jsonify({
            'prediction': bool(prediction[0]),
            'riskScore': risk_score,
            'message': 'Heart disease risk assessment completed successfully.'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

if __name__ == '__main__':
    load_model()
    app.run(host='localhost', port=5001, debug=True)