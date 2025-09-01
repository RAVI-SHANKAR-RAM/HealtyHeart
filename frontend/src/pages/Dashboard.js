import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Welcome, {currentUser?.name}!</h1>
        <p className="dashboard-subtitle">Manage your heart health with our tools and resources.</p>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Heart Disease Prediction</h3>
            <p>Assess your risk of heart disease using our advanced machine learning model.</p>
            <Link to="/prediction" className="btn btn-primary">Start Assessment</Link>
          </div>
          
          <div className="dashboard-card">
            <h3>Appointment Booking</h3>
            <p>Schedule appointments with healthcare professionals for consultations.</p>
            <Link to="/appointment" className="btn btn-secondary">Book Appointment</Link>
          </div>
          
          <div className="dashboard-card">
            <h3>Prediction History</h3>
            <p>View your previous risk assessments and track your heart health over time.</p>
            <Link to="/history" className="btn btn-primary">View History</Link>
          </div>
          
          <div className="dashboard-card">
            <h3>Profile Management</h3>
            <p>Update your personal information and health preferences.</p>
            <Link to="/profile" className="btn btn-secondary">Edit Profile</Link>
          </div>
        </div>
        
        <div className="dashboard-stats">
          <h2>Heart Health Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Recommended Checkups</h4>
              <p className="stat-number">Every 6 months</p>
            </div>
            <div className="stat-card">
              <h4>Normal Blood Pressure</h4>
              <p className="stat-number">120/80 mmHg</p>
            </div>
            <div className="stat-card">
              <h4>Healthy Cholesterol</h4>
              <p className="stat-number">Below 200 mg/dL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;