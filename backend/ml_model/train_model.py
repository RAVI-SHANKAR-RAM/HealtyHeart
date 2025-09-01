import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import pickle
import json
import os

def train_heart_disease_model():
    print("Starting heart disease model training...")
    
    # Load the dataset
    try:
        df = pd.read_csv('HeartDiseaseTrain-Test.csv')
        print("Dataset loaded successfully!")
    except FileNotFoundError:
        print("Error: Could not find HeartDiseaseTrain-Test.csv")
        return
    
    # Display dataset info
    print(f"Dataset shape: {df.shape}")
    print("\nFirst few rows of the dataset:")
    print(df.head())
    
    # Data preprocessing
    print("Preprocessing data...")
    
    # Convert categorical variables to numerical
    label_encoders = {}
    categorical_cols = ['sex', 'chest_pain_type', 'fasting_blood_sugar', 
                        'rest_ecg', 'exercise_induced_angina', 'slope', 
                        'vessels_colored_by_flourosopy', 'thalassemia']
    
    # Handle any missing values if present
    df = df.dropna()
    
    for col in categorical_cols:
        if col in df.columns:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            label_encoders[col] = le
            print(f"Encoded {col}: {dict(zip(le.classes_, le.transform(le.classes_)))}")
    
    # Split features and target
    X = df.drop('target', axis=1)
    y = df['target']
    
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"\nTraining set: {X_train.shape}")
    print(f"Testing set: {X_test.shape}")
    
    # Check class distribution
    print(f"\nClass distribution in training set: {np.bincount(y_train)}")
    print(f"Class distribution in testing set: {np.bincount(y_test)}")
    
    # Train model
    print("\nTraining Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=100, 
        random_state=42,
        max_depth=10,
        min_samples_split=5,
        class_weight='balanced'
    )
    
    model.fit(X_train, y_train)
    
    # Make predictions
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)
    
    # Evaluate model
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nModel Accuracy: {accuracy:.4f}")
    
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, y_pred))
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nFeature Importance:")
    print(feature_importance)
    
    # Save the model
    with open('heart_disease_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    # Save label encoders
    with open('label_encoders.pkl', 'wb') as f:
        pickle.dump(label_encoders, f)
    
    # Create a mapping for the frontend
    feature_mapping = {
        'age': 'age',
        'sex': {'Male': 1, 'Female': 0},
        'chest_pain_type': {
            'Typical angina': 0, 'Atypical angina': 1,
            'Non-anginal pain': 2, 'Asymptomatic': 3
        },
        'resting_blood_pressure': 'resting_blood_pressure',
        'cholestoral': 'cholestoral',
        'fasting_blood_sugar': {
            'Lower than 120 mg/ml': 0, 'Greater than 120 mg/ml': 1
        },
        'rest_ecg': {
            'Normal': 0, 'ST-T wave abnormality': 1, 
            'Left ventricular hypertrophy': 2
        },
        'Max_heart_rate': 'Max_heart_rate',
        'exercise_induced_angina': {'No': 0, 'Yes': 1},
        'oldpeak': 'oldpeak',
        'slope': {'Flat': 0, 'Upsloping': 1, 'Downsloping': 2},
        'vessels_colored_by_flourosopy': {
            'Zero': 0, 'One': 1, 'Two': 2, 'Three': 3, 'Four': 4
        },
        'thalassemia': {
            'Normal': 0, 'Fixed Defect': 1, 
            'Reversable Defect': 2, 'No': 3
        }
    }
    
    with open('feature_mapping.json', 'w') as f:
        json.dump(feature_mapping, f, indent=2)
    
    print("\nModel training complete!")
    print("Saved files:")
    print("- heart_disease_model.pkl (trained model)")
    print("- label_encoders.pkl (label encoders for categorical variables)")
    print("- feature_mapping.json (feature mapping for frontend)")
    
    return model, label_encoders

if __name__ == "__main__":
    train_heart_disease_model()